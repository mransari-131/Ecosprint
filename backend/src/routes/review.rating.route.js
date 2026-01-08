const express = require("express");
const reviewRatingController = require("../controllers/review.rating.controller.js");
const auth = require("../middlewares/auth.js");
const {uploadReviewImage}= require("../middlewares/multer.js");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Review Rating
 *   description: Review Rating Management
 */

/**
 * @swagger
 * /reviews/add:
 *   post:
 *     summary: Create a new review
 *     tags: [Review Rating]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               rating:
 *                 type: number
 *                 enum: ['5','4','3','2','1']
 *               reviewText:
 *                 type: string
 *               reviewImages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Images of the product (up to 5 images).
 *     responses:
 *       201:
 *         description: Review created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 */
router.post("/add", uploadReviewImage, auth, reviewRatingController.createReviewRating);

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Get a review by its ID
 *     tags: [Review Rating]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review data
 *       404:
 *         description: Review not found
 */
router.get("/:id", reviewRatingController.getReviewById);

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Review Rating]
 *     responses:
 *       200:
 *         description: Review data
 *       404:
 *         description: Review not found
 */
router.get("", reviewRatingController.getAllReviews);

/**
 * @swagger
 * /reviews/{id}/update:
 *   put:
 *     summary: Update a review by its ID
 *     tags: [Review Rating]
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
 *               rating:
 *                 type: number
 *                 enum: ['5','4','3','2','1']
 *               reviewText:
 *                 type: string
 *               reviewImages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Images of the product (up to 5 images).
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       404:
 *         description: Review not found
 */
router.put("/:id/update", uploadReviewImage, reviewRatingController.updateReview);

/**
 * @swagger
 * /reviews/{id}/delete:
 *   delete:
 *     summary: Delete a review by its ID
 *     tags: [Review Rating]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reviewId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 */
router.delete("/:id/delete", reviewRatingController.deleteReview);

module.exports = router;
