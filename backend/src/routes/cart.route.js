const express = require("express");
const cartController = require("../controllers/cart.controller.js");
const router = express.Router();
const auth = require("../middlewares/auth.js");

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: User Cart Management
 */

/**
 * @swagger
 * /cart/user:
 *   get:
 *     summary: Retreive the user cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Retreive user cart successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 */
router.get("/user", auth, cartController.getCartByUserId);

/**
 * @swagger
 * /cart/user/item:
 *   post:
 *     summary: Add an item to the cart.
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *           productId:
 *             type: string
 *           quantity:
 *             type: number
 *           size:
 *             type: string
 *     responses:
 *       200:
 *         description: Cart Details
 *       404:
 *         description: Cart not found
 */
router.post("/user/item", auth, cartController.addItemToCart);

/**
 * @swagger
 * /cart/user/item:
 *   put:
 *     summary: Update the quantity of an item in the cart.
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *               size:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated Cart
 *       404:
 *         description: Cart not found
 */
router.put("/user/item", auth, cartController.updateCartItem);

/**
 * @swagger
 *  /cart/user/item/{productId}:
 *   delete:
 *     summary: Remove an item from the cart.
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product item to remove.
 *     responses:
 *       200:
 *         description: The updated Cart
 *       404:
 *         description: Cart not found
 */
router.delete("/user/item/:productId", auth, cartController.removeCartItem);

/**
 * @swagger
 * /cart/user:
 *   delete:
 *     summary: Clear the user's cart.
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Cart cleared successfully.
 *       404:
 *         description: Cart not found.
 */
router.delete("/user", auth, cartController.clearCart);

module.exports = router;
