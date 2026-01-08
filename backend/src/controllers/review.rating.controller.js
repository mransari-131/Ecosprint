const ReviewService = require('../services/review.rating.service.js');
const logger = require("../configs/winston.config.js");

// Create a new contact form
const createReviewRating = async (req, res, next) => {
  try {
    const review = await ReviewService.createReview( req.user.id, req.body.jewelleryId, req.body, req.files);
    res.status(201).json({
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

// Get all users
const getReviewById = async (req, res, next) => {
  try {
    const review = await ReviewService.getReviewById(req.params.id);
    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

// Get user by ID
const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await ReviewService.getAllReviews();
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

// Update user by ID
const updateReview = async (req, res, next) => {
  try {
    const updatedReviewRating = await ReviewService.updateReview(req.user.id, req.params.id, req.body, req.files);
    res.status(200).json({
      success: true,
      data: updatedReviewRating,
    });
  } catch (error) {
    //console.log(error);
    next(error);
  }
};

// Delete user by ID
const deleteReview = async (req, res, next) => {
  try {
    const review= await ReviewService.deleteReview(req.user.id, req.params.id);
    res.status(200).json({ message: "Review deleted successfully", review });
  } catch (error) {
    next(error);
  }
};

module.exports= {createReviewRating, getReviewById, getAllReviews, updateReview, deleteReview};
