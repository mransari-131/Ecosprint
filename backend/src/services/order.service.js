const Cart = require("../models/cart.model.js");
const Order = require("../models/order.model.js");
const Product = require("../models/product.model.js");
const User = require("../models/user.model.js");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const {
    ConflictError,
    NotFoundError,
    BadRequestError,
} = require("../errors/errors.js");

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Utility: Fetch and validate cart
const fetchValidCart = async (userId) => {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
        throw new BadRequestError("Cart is empty or not found");
    }

    const validItems = [];
    for (const item of cart.items) {
        if (item.productId.stockStatus === "in-stock" && item.quantity <= item.productId.stock) {
            validItems.push(item);
        } else {
            throw new BadRequestError(
                `Item ${item.productId.name} (ID: ${item.productId._id}) is unavailable or exceeds stock.`
            );
        }
    }

    if (validItems.length === 0) {
        throw new BadRequestError("No valid items available to place an order");
    }

    return { cart, validItems };
};

const generateOrderCode = async () => {
    let id;
    do {
        id = Math.floor(10 ** 14 + Math.random() * 9 * 10 ** 14); // Generates a number between 10^14 and 10^15 - 1
    } while (id % 10 === 0); // Ensures it does not end in zero
    return id; // Returns the number as a string
};


// Create an order
const createCartOrder = async (userId, addressId) => {
    var orderCodeString='ODR';
    const { cart, validItems } = await fetchValidCart(userId);
    let orderCode=0;
    let orderCodeCheck=[];
    do {
        let orderCode1 = await generateOrderCode();
        orderCode= orderCodeString+orderCode1;
        // Check if the generated order code already exists
        orderCodeCheck = await Order.find({ orderCode });
    } while (orderCodeCheck.length > 0); // Repeat if the order code already exists

    const totalAmount = validItems.reduce((sum, item) => sum + item.amount, 0)+79;
    const order = new Order({
        userId,
        orderCode,
        items: validItems,
        totalAmount,
        addressId,
    });
    const currentDate = new Date();
    order.deliveryDate= new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    await order.save();
    const user = await User.findById(userId);
    user.orders.push(order._id);
    await user.save();

    // Deduct stock and clear cart
    for (const item of order.items) {
        const product = await Product.findById(item.productId._id);
        if (!product) throw new NotFoundError(`Product not found for ID ${item.productId._id}`);
        product.stock -= item.quantity;
        product.orders.push(order._id);
        await product.save();
    }
    cart.items = [];
    await cart.save();

    return { message: "Order placed successfully", order };
};

const createBuyNowOrder = async (userId, addressId, itemData) => {
    const orderCodePrefix = "ODR";
    let orderCode, orderCodeCheck;

    // Generate a unique order code
    do {
        const generatedCode = await generateOrderCode();
        orderCode = orderCodePrefix + generatedCode;
        orderCodeCheck = await Order.exists({ orderCode });
    } while (orderCodeCheck);

    // Normalize `items` to always be an array
    const items = Array.isArray(itemData.items) ? itemData.items : [{ 
        productId: itemData.productId, 
        quantity: itemData.quantity, 
        size: itemData.size 
    }];

    const processedItems = [];
    let totalAmount = 79; // Base shipping cost

    for (const item of items) {
        const product = await Product.findById(item.productId);
        if (!product) {
            throw new NotFoundError(`Product not found for ID ${item.productId}`);
        }

        const amount = product.salePrice * item.quantity;
        const size = `${item.size}`;

        processedItems.push({
            productId: item.productId,
            quantity: item.quantity,
            amount,
            size,
        });

        totalAmount += amount;
    }

    // Create the order
    const order = new Order({
        userId,
        orderCode,
        items: processedItems,
        totalAmount,
        addressId,
        deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    });

    await order.save();

    // Update user's order history
    await User.findByIdAndUpdate(userId, { $push: { orders: order._id } });

    // Deduct stock for all items
    await Promise.all(processedItems.map(async (item) => {
        await Product.findByIdAndUpdate(item.productId, {
            $inc: { stock: -item.quantity },
            $push: { orders: order._id },
        });
    }));
    const cart = await Cart.findOne({ userId });
    cart.items = [];
    await cart.save();
    // Initiate Razorpay payment
    const razorpayOrder = await razorpay.orders.create({
        amount: totalAmount * 100, // Convert to paise
        currency: "INR",
        receipt: `ORDER_${order.orderCode}`,
    });

    // Attach Razorpay order ID to order
    order.paymentId = razorpayOrder.id;
    await order.save();

    return { 
        message: "Order placed successfully", 
        order, 
        razorpayOrder 
    };
};


// Initiate Razorpay payment
const initiatePayment = async (orderId) => {
    const order = await Order.findById(orderId);
    if (!order) throw new NotFoundError("Order not found");

    const razorpayOrder = await razorpay.orders.create({
        amount: order.totalAmount * 100,
        currency: "INR",
        receipt: `ORDER_${order.orderCode}`,
    });

    order.paymentId = razorpayOrder.id;
    await order.save();

    return { razorpayOrder };
};

// Verify Razorpay payment
const verifyPayment = async (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
    const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

    if (generatedSignature !== razorpay_signature) {
        throw new BadRequestError("Payment verification failed");
    }

    const order = await Order.findOne({ paymentId: razorpay_order_id });
    if (!order) throw new NotFoundError("Order not found");

    // Deduct stock and clear cart
    for (const item of order.items) {
        const product = await Product.findById(item.productId._id);
        if (!product) throw new NotFoundError(`Product not found for ID ${item.productId._id}`);
        product.stock -= item.quantity;
        await product.save();
    }
    order.paymentStatus = "Paid";
    order.orderStatus="Order Confirmed";
    order.deliveryDate= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await order.save();

    return { message: "Payment successful", order };
};

// Get all orders for a user
const getOrdersByUserId = async (userId) => {
    const orders = await Order.find({ userId }).populate("items.productId").populate("addressId").populate("userId","name phone email");
    if (!orders) throw new NotFoundError("Orders not found");
    return orders;
};

// Get a single order by ID
const getOrderById = async (orderId) => {
    const order = await Order.findById(orderId).populate("items.productId");
    if (!order) throw new NotFoundError("Order not found");
    return order;
};

// Update order status
const updateOrderShippingStatus = async (orderId, status) => {
    const order = await Order.findById(orderId);
    if (!order) throw new NotFoundError("Order not found");
    if (!status) throw new BadRequestError("Order status is required");

    if (status === "Order Cancelled") {
        for (const item of order.items) {
            const product = await Product.findById(item.productId);
            if (product) {
                product.stock += item.quantity;
                await product.save();
            } else {
                console.error(`Product with ID ${item.productId} not found`);
            }
        }
    }
    order.orderStatus=status;
    await order.save();
    return order;
};


// Delete an order
const deleteOrder = async (orderId) => {
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) throw new NotFoundError("Order not found");
    const user = await User.findById(order.userId);
    user.orders = user.orders.filter(
        (id) => id.toString() !== orderId.toString()
    );
    await user.save();
    for (const item of order.items) {
        const product = await Product.findById(item.productId._id);
        if (!product) throw new NotFoundError(`Product not found for ID ${item.productId._id}`);
        product.orders = product.orders.filter(
            (id) => id.toString() !== orderId.toString()
        );
        await product.save();
    }
    return { message: "Order deleted successfully", order };
};

const getAllOrders = async (filters) => {
    const query = {};

    // Apply filters
    if (filters.category) query.category = filters.category;
    if (filters.orderStatus) query.orderStatus= filters.orderStatus;

    // Advanced price filter (minPrice, maxPrice)
    if (filters.duration) {
        let startDate = null;
        let endDate = new Date(); // Default end date is today
        const today = new Date();
    
        // Past durations
        if (filters.duration === "Past 1 Week") {
            startDate = new Date();
            startDate.setDate(today.getDate() - 7);
        } else if (filters.duration === "Past 1 Month") {
            startDate = new Date();
            startDate.setMonth(today.getMonth() - 1);
        } else if (filters.duration === "Past 1 Quarter") {
            const currentQuarter = Math.floor(today.getMonth() / 3); // Get current quarter (0-3)
            const lastQuarterEndMonth = currentQuarter * 3 - 1; // Last quarter's last month
            const lastQuarterStartMonth = lastQuarterEndMonth - 2; // Last quarter's first month
    
            startDate = new Date(today.getFullYear(), lastQuarterStartMonth, 1);
            endDate = new Date(today.getFullYear(), lastQuarterEndMonth + 1, 0); // Last day of last quarter
        } else if (filters.duration === "Past 1 Last Year") {
            startDate = new Date(today.getFullYear() - 1, 0, 1); // January 1st of last year
            endDate = new Date(today.getFullYear() - 1, 11, 31); // December 31st of last year
        }
    
        // Apply date filter to the query
        if (startDate) {
            query.createdAt = { $gte: startDate };
            if (filters.duration.includes("Past 1 Last Quarter") || filters.duration.includes("Past 1 Last Year")) {
                query.createdAt.$lte = endDate;
            }
        }

    }
    
    // Query database with filters and sorting
    const filteredOrders = await Order.find(query).populate("userId","name phone email").populate("addressId").populate("items.productId").exec();

    if (!filteredOrders || filteredOrders.length === 0) {
        throw new Error("No orders found matching the criteria.");
    }

    // If a search query is provided, use js-search for in-memory searching
    let finalResults = filteredOrders;
    
    return finalResults;
};

module.exports = {
    createCartOrder,
    createBuyNowOrder,
    initiatePayment,
    verifyPayment,
    getOrdersByUserId,
    getOrderById,
    updateOrderShippingStatus,
    deleteOrder,
    getAllOrders
};
