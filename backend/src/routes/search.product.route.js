const express = require("express");
const productController = require("../controllers/product.controller.js");
const router = express.Router();

/**
 * @swagger
 * /search/products:
 *   get:
 *     summary: Search for Products
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: searchQuery
 *         schema:
 *           type: string
 *       - in: query
 *         name: productCode
 *         schema:
 *           type: string
 *       - in: query
 *         name: productName
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: ['Floaters', 'Loafers', 'Oxford', 'Slip-ins', 'Boots', 'Running Shoes', 'Walking Shoes', 'Sandals', 'Flip Flops', 'Sports Shoes', 'Formal Shoes', 'Casual Shoes', 'Ethnic']
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *           enum: ['Men', 'Women', 'Kids', 'Unisex']
 *       - in: query
 *         name: material
 *         schema:
 *           type: string
 *           enum: ['Leather', 'Canvas', 'Mesh', 'Suede', 'Synthetic', 'Rubber', 'Fabric', 'Cotton', 'Nylon']
 *       - in: query
 *         name: occasion
 *         schema:
 *           type: string
 *           enum: ['Casual', 'Formal', 'Sports', 'Party', 'Beach', 'Wedding', 'Work', 'Outdoor']
 *       - in: query
 *         name: season
 *         schema:
 *           type: string
 *           enum: ['Summer', 'Winter', 'Monsoon', 'All Season']
 *       - in: query
 *         name: isNewArrival
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: specialCollection
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: isBestSeller
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: isOnSale
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: availability
 *         schema:
 *           type: string
 *           enum: ['exclude out of stock']
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: 
 *       - in: query
 *         name: rating
 *         schema:
 *           type: string
 *           enum: ["4.0 and above","3.0 and above"]
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [salePrice, rating]
 *         description: Sort properties by expected price and rating
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [Low to High, High to Low]
 *         description: Order of sorting (asc for ascending, desc for descending)
 *     responses:
 *       200:
 *         description: List of products matching the criteria
 *       404:
 *         description: No products found
 */
router.get("/", productController.searchProduct);

module.exports = router;
