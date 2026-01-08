const express = require("express");
const orderController = require("../controllers/order.controller.js");
const router = express.Router();
const auth = require("../middlewares/auth.js");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: User Order Management
 */

/**
 * @swagger
 * /orders/user:
 *   get:
 *     summary: Retrieve all orders for a user.
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: A list of orders.
 *       404:
 *         description: Orders not found.
 *       500:
 *         description: Internal Server Error.
 */
router.get("/user", auth, orderController.getOrdersByUserId);

/**
 * @swagger
 * /orders/{orderId}:
 *   get:
 *     summary: Retrieve a specific order by ID.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order.
 *     responses:
 *       200:
 *         description: Order details.
 *       404:
 *         description: Order not found.
 */
router.get("/:orderId", orderController.getOrderById);

/**
 * @swagger
 * /orders/cart:
 *   post:
 *     summary: Create an order from the user's cart.
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               addressId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Cart or items not found.
 */
router.post("/cart", auth, orderController.createCartOrder);

/**
 * @swagger
 * /orders/buy-now:
 *   post:
 *     summary: Create a "Buy Now" order (Supports single or multiple items).
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - type: object  # Single item order
 *                 properties:
 *                   addressId:
 *                     type: string
 *                     description: Address ID for the order
 *                   productId:
 *                     type: string
 *                     description: ID of the product being purchased
 *                   quantity:
 *                     type: number
 *                     description: Quantity of the product
 *                   size:
 *                     type: string
 *                     description: Size of the product
 *               - type: object  # Multiple items order
 *                 properties:
 *                   addressId:
 *                     type: string
 *                     description: Address ID for the order
 *                   items:
 *                     type: array
 *                     description: Array of items to order
 *                     items:
 *                       type: object
 *                       properties:
 *                         productId:
 *                           type: string
 *                           description: ID of the product being purchased
 *                         quantity:
 *                           type: number
 *                           description: Quantity of the product
 *                         size:
 *                           type: string
 *                           description: Size of the product
 *     responses:
 *       201:
 *         description: Order created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 order:
 *                   type: object
 *       400:
 *         description: Bad request (invalid data or missing fields).
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Internal server error.
 */
router.post("/buy-now", auth, orderController.createBuyNowOrder);

/**
 * @swagger
 * /orders/{orderId}/payment:
 *   post:
 *     summary: Initiate payment for an order.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order.
 *     responses:
 *       200:
 *         description: Payment initiated successfully.
 *       404:
 *         description: Order not found.
 */
router.post("/:orderId/payment", orderController.initiatePayment);

/**
 * @swagger
 * /orders/payment/verify:
 *   post:
 *     summary: Verify a Razorpay payment.
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               razorpay_order_id:
 *                 type: string
 *               razorpay_payment_id:
 *                 type: string
 *               razorpay_signature:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment verified successfully.
 *       400:
 *         description: Payment verification failed.
 *       404:
 *         description: Order not found.
 */
router.post("/payment/verify", orderController.verifyPayment);

/**
 * @swagger
 * /orders/{orderId}/update:
 *   put:
 *     summary: Update the status of an order.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderStatus:
 *                 type: string
 *                 enum: ["Order Processing","Order Confirmed", "Order Packed", " Order Shipped", "Out of Delivery", "Order Completed", "Order Cancelled", "Order Replacement Requested", "Order Replacement Approved","Replacement Order Processing","Replacement Order Packed", "Replacement Order Shipped", "Replacement Order Out of Delivery", "Replacement Order Completed"]
 *                 description: The new status of the order.
 *     responses:
 *       200:
 *         description: Order status updated successfully.
 *       404:
 *         description: Order not found.
 */
router.put("/:orderId/update", orderController.updateOrderShippingStatus);

/**
 * @swagger
 * /orders/{orderId}/delete:
 *   delete:
 *     summary: Delete an order by ID.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order.
 *     responses:
 *       200:
 *         description: Order deleted successfully.
 *       404:
 *         description: Order not found.
 */
router.delete("/:orderId/delete", orderController.deleteOrder);

/**
 * @swagger
 * /orders/:
 *   get:
 *     summary: All orders with filter
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: ['Floaters', 'Loafers', 'Oxford', 'Slip-ins', 'Boots', 'Running Shoes', 'Walking Shoes', 'Sandals', 'Flip Flops', 'Sports Shoes', 'Formal Shoes', 'Casual Shoes', 'Ethnic']
 *       - in: query
 *         name: duration
 *         schema:
 *           type: string
 *           enum: ['Past 1 week', 'Past 1 month', 'Past 1 quarter', 'Past 1 year', 'All time']
 *       - in: query
 *         name: orderStatus
 *         schema:
 *           type: string
 *           enum: ["Order Processing","Order Confirmed", "Order Packed", " Order Shipped", "Out of Delivery", "Order Completed", "Order Cancelled", "Order Replacement Requested", "Order Replacement Approved","Replacement Order Processing","Replacement Order Packed", "Replacement Order Shipped", "Replacement Order Out of Delivery", "Replacement Order Completed"]
 *     responses:
 *       200:
 *         description: List of orders matching the criteria
 *       404:
 *         description: No orders found
 */
router.get("/", orderController.getAllOrders);

module.exports = router;
