const cartService = require("../services/cart.service.js");
const logger = require("../configs/winston.config.js");

// Get cart by userId
const getCartByUserId = async (req, res, next) => {
    try {
        const cart = await cartService.getCartByUserId(req.user.id);
        res.status(200).json({success: true,
            data: cart});
    } catch (error) {
        next(error);
    }
};

// Add item to cart
const addItemToCart = async (req, res, next) => {
    try {
        const cart = await cartService.addItemToCart(req.user.id, req.body);
        res.status(200).json({success: true,
            data: cart});
    } catch (error) {
        next(error);
    }
};

// Update item quantity in cart
const updateCartItem = async (req, res, next) => {
    try {
        const cart = await cartService.updateCartItem(req.user.id, req.body);
        res.status(200).json({success: true,
            data: cart});
    } catch (error) {
        next(error);
    }
};

// Remove item from cart
const removeCartItem = async (req, res, next) => {
    try {
        const cart = await cartService.removeCartItem(req.user.id, req.params.productId);
        res.status(200).json({success: true,
            data: cart});
    } catch (error) {
        next(error);
    }
};

// Clear cart
const clearCart = async (req, res, next) => {
    try{
        const response = await cartService.clearCart(req.user.id);
        res.status(200).json({success: true,
            data: response});
    } catch (error) {
        next(error);
    }
};

module.exports= {getCartByUserId, addItemToCart , updateCartItem, removeCartItem, clearCart}
