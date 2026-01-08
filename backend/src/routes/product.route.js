const express = require("express");
const productController = require("../controllers/product.controller.js");
const auth = require("../middlewares/auth.js");
const {upload} =require("../middlewares/multer.js");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management and operations
 */

/**
 * @swagger
 * /product/add:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               description:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: ['Men', 'Women', 'Kids', 'Unisex']
 *               category:
 *                 type: string
 *                 enum: ['Sneakers', 'Loafers', 'Oxford', 'Slip-ons', 'Slip-ins', 'Running Shoes', 'Walking Shoes', 'Boots', 'Sandals', 'Floaters', 'Flip Flops', 'Sports Shoes', 'Formal Shoes', 'Casual Shoes', 'Ethnic']
 *               price:
 *                 type: number
 *               salePrice:
 *                 type: number
 *               stockStatus:
 *                 type: string
 *                 enum: ['in-stock','out-of-stock']
 *               sizeType:
 *                 type: string
 *                 enum: ['UK', 'US', 'EU']
 *               size:
 *                 type: number
 *               stock:
 *                 type: number
 *               material:
 *                 type: string
 *                 enum: ['Leather', 'Canvas', 'Mesh', 'Suede', 'Synthetic', 'Rubber', 'Fabric', 'Cotton', 'Nylon']
 *               color:
 *                 type: string
 *                 enum: ['Black', 'Brown', 'White', 'Blue', 'Red', 'Green', 'Yellow', 'Grey', 'Multi-color']
 *               occasion:
 *                 type: string
 *                 enum: ['Casual', 'Formal', 'Sports', 'Party', 'Beach', 'Wedding', 'Work', 'Outdoor']
 *               season:
 *                 type: string
 *                 enum: ['Summer', 'Winter', 'Monsoon', 'All Season']
 *               isNewArrival:
 *                 type: boolean
 *               isBestSeller:
 *                 type: boolean
 *               isOnSale:
 *                 type: boolean
 *               specialCollection:
 *                 type: boolean
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Images of the product (up to 10 images).
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 */
router.post("/add", upload, auth, productController.createProduct);


/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get a product by its ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product data
 *       404:
 *         description: Product not found
 */
router.get("/:id", productController.getProductById);

/**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: Update a product by its ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               description:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: ['Men', 'Women', 'Kids', 'Unisex']
 *               category:
 *                 type: string
 *                 enum: ['Sneakers', 'Loafers', 'Oxford', 'Slip-ons', 'Slip-ins', 'Running Shoes', 'Walking Shoes', 'Boots', 'Sandals', 'Floaters', 'Flip Flops', 'Sports Shoes', 'Formal Shoes', 'Casual Shoes', 'Ethnic']
 *               price:
 *                 type: number
 *               salePrice:
 *                 type: number
 *               stockStatus:
 *                 type: string
 *                 enum: ['in-stock','out-of-stock']
 *               sizeType:
 *                 type: string
 *                 enum: ['UK', 'US', 'EU']
 *               size:
 *                 type: number
 *               stock:
 *                 type: number
 *               material:
 *                 type: string
 *                 enum: ['Leather', 'Canvas', 'Mesh', 'Suede', 'Synthetic', 'Rubber', 'Fabric', 'Cotton', 'Nylon']
 *               color:
 *                 type: string
 *                 enum: ['Black', 'Brown', 'White', 'Blue', 'Red', 'Green', 'Yellow', 'Grey', 'Multi-color']
 *               occasion:
 *                 type: string
 *                 enum: ['Casual', 'Formal', 'Sports', 'Party', 'Beach', 'Wedding', 'Work', 'Outdoor']
 *               season:
 *                 type: string
 *                 enum: ['Summer', 'Winter', 'Monsoon', 'All Season']
 *               isNewArrival:
 *                 type: boolean
 *               isBestSeller:
 *                 type: boolean
 *               isOnSale:
 *                 type: boolean
 *               specialCollection:
 *                 type: boolean
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Images of the property (up to 10 images).
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
router.put("/:id", upload, auth, productController.updateProduct);

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Delete a product by its ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete("/:id", auth, productController.deleteProduct);

module.exports = router;
