const orderService = require("../services/order.service.js");
const logger = require("../configs/winston.config.js");

// Create an order after buy now
const createBuyNowOrder = async (req, res, next) => {
    try{
        const {message, order, razorpayOrder}= await orderService.createBuyNowOrder(req.user.id, req.body.addressId, req.body);
        res.status(201).json({ message, order, razorpayOrder });
    } catch (error) {
        next(error);
    }
}
// Create an order from the cart
const createCartOrder = async (req, res, next) => {
    try{
        const {message, order}= await orderService.createCartOrder(req.user.id, req.body.addressId);
        res.status(201).json({ message, order });
    } catch (error) {
        next(error);
    }
};

// Initiate Razorpay payment
const initiatePayment = async (req, res, next) => {
    try {
        const razorpayOrder= await orderService.initiatePayment(req.params.orderId);
        res.status(200).json({ razorpayOrder });
    } catch (error) {
         next(error);
    }
};

// Verify Razorpay payment
const verifyPayment = async (req, res, next) => {
    try {
        const { message, order }= await orderService.verifyPayment(req.body.razorpay_order_id, req.body.razorpay_payment_id, req.body.razorpay_signature);
        res.status(200).json({ message, order });
    } catch (error) {
         next(error);
    }
};

// Get all orders for a user
const getOrdersByUserId = async (req, res, next) => {
    try {
        const orders = await orderService.getOrdersByUserId(req.user.id);
        res.status(200).json({
            success: true,
            data: orders,
          });
    } catch (error) {
         next(error);
    }
};

// Get a single order by ID
const getOrderById = async (req, res, next) => {
    try {
        const order = await orderService.getOrderById(req.params.orderId);
        res.status(200).json(order);
    } catch (error) {
         next(error);
    }
};

// Update order status
const updateOrderShippingStatus = async (req, res, next) => {
    try {
        const order = await orderService.updateOrderShippingStatus(req.params.orderId, req.body.orderStatus);
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
         next(error);
    }
};

// Delete an order
const deleteOrder = async (req, res, next) => {
    try {
        const { message, order } = await orderService.deleteOrder(req.params.orderId);
        res.status(200).json({ message, order });
    } catch (error) {
         next(error);
    }
};

//Get All orders
const getAllOrders = async(req, res, next) =>{
    try{
            const filters = {
                category: req.query.category,
                duration: req.query.duration,
                orderStatus: req.query.orderStatus,
              };
          
            const orders= await orderService.getAllOrders(filters);
            res.status(200).json({
                success: true,
                data: orders,
              });
        }
        catch(error){
          //console.log(error);
          next(error);
        }
}

module.exports={createBuyNowOrder, createCartOrder, initiatePayment, verifyPayment, getOrderById, getOrdersByUserId, updateOrderShippingStatus, deleteOrder, getAllOrders};
