const { BadRequestError, NotFoundError } = require("../errors/errors");
const Cart = require("../models/cart.model.js");
const Product = require("../models/product.model.js");
const User= require("../models/user.model.js");

// Get cart by userId
const getCartByUserId = async (userId) => {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (cart.items.length===0) {
        throw new BadRequestError("Cart is empty");
    }
    return cart;
};

// Add item to cart
const addItemToCart = async (userId, { productId, quantity, size }) => {
    if (!productId || !quantity || quantity <= 0) {
        throw new BadRequestError("Invalid item data");
    }
    let user = await User.findById(userId);
    let cart = await Cart.findOne({ userId });
    let product= await Product.findById(productId);
    if(!product){
        throw new NotFoundError("Product not found");
    }
    let amount=product.salePrice*quantity;
    size = product.sizeType+"-"+size;
    if (!cart) {
        cart = new Cart({ userId, items: [{ productId, quantity, amount, size }] });
        user.cart=cart._id;
        await user.save();
    } else {
        const itemIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId && item.size.toString()===size
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
            cart.items[itemIndex].amount += product.salePrice*quantity;
            cart.items[itemIndex].size=size;
        } else {
            cart.items.push({ productId, quantity, amount, size });
        }
    }
    await cart.save();
    const cart1 = await Cart.findOne({ userId }).populate("items.productId");
    return cart1;
};

// Update item quantity in cart
const updateCartItem = async (userId, { productId, quantity, size }) => {
    if (!productId || quantity === undefined || quantity < 0) {
        throw new BadRequestError("Invalid item data");
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
        throw new BadRequestError("Cart not found");
    }

    const product = await Product.findById(productId);
    if (!product) {
        throw new BadRequestError("Product not found");
    }

    const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId && item.size.toString()===size
    );
    if (itemIndex > -1) {
        if (quantity === 0) {
            cart.items.splice(itemIndex, 1); // Remove item if quantity is 0
        } else {
            cart.items[itemIndex].quantity = quantity;
            cart.items[itemIndex].amount = product.salePrice*quantity;
        }
    } else {
        throw new BadRequestError("Item not found in cart");
    }

    await cart.save();
    const cart1 = await Cart.findOne({ userId }).populate("items.productId");
    return cart1;
};

// Remove item from cart
const removeCartItem = async (userId, productId) => {
    if (!productId) {
        throw new BadRequestError("Product not found");
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
        throw new BadRequestError("Cart not found");
    }

    const initialItemCount = cart.items.length;
    cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId
    );

    if (cart.items.length === initialItemCount) {
        throw new BadRequestError("Item not found in cart");
    }

    await cart.save();
    const cart1 = await Cart.findOne({ userId }).populate("items.productId");
    return cart1;
};

// Clear cart
const clearCart = async (userId) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
        throw new BadRequestError("Cart not found");
    }

    cart.items = [];
    await cart.save();
    return { message: "Cart cleared successfully" };
};

module.exports = {
    getCartByUserId,
    addItemToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
};
