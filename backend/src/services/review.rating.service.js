const { NotFoundError, BadRequestError } = require("../errors/errors");
const Review = require("../models/review.rating.model");
const Product = require("../models/product.model.js");
const {uploadImages, uploadImage} = require('../utils/image.upload.util.js');
const User = require('../models/user.model.js');

const createReview = async (userId, productId, reviewData, files) => {
    const product = await Product.findById(productId);
    if(!product){
        throw new NotFoundError("Product not found");
    }
    const user = await User.findById(userId);
    if(!user){
        throw new NotFoundError("User not found");
    }
    const review = new Review();
    review.productId= productId;
    review.userId=userId;
    review.rating=reviewData.rating;
    review.reviewText=reviewData.reviewText;
    if(files){
        const imageURLs = await uploadImages(files);
        review.reviewImages=imageURLs;
    }
    
    await review.save();
    var totalRating=0;
    product.reviews.push(review._id);
    await product.save();
    const allReviews = await Product.findById(productId).populate("reviews");
    
    allReviews.reviews.forEach(item => {
    totalRating += item.rating;});
    
    product.avgRating=totalRating/product.reviews.length;
    await product.save();

    user.reviews.push(review._id);
    await user.save();
    return review;
};

const getAllReviews = async () => {

    const reviews = await Review.find().populate("userId", ["profilePic", "name", "createdAt"]);
    if(!reviews){
        throw new NotFoundError("Reviews not found");
    }
    return reviews;
};

const getReviewById = async (reviewId) => {
    const review = await Review.findById(reviewId).populate("userId", ["profilePic", "name", "createdAt"]);

    if(!review){
        throw new NotFoundError("Review not found");
    }
    return review;
};

const updateReview = async (userId, reviewId, reviewData, files) => {
    
    const review = await Review.findById(reviewId);
    if(!review){
        throw new NotFoundError("Review not found");
    }
    const user= await User.findById(userId);
    
    // Ensure the user has the 'admin' role
    if ((user.role !== 'Admin') && (review.userId.toString() !== user._id.toString())) {
        throw new BadRequestError('Only admins and review creator can delete reviews');
    }

    if(reviewData.reviewText){
        review.reviewText=reviewData.reviewText;
    }
    if(reviewData.rating){
        review.rating=reviewData.rating;
    }
    if(files){
        const imageURLs = await uploadImages(files);
        review.reviewImages=imageURLs;
    }
    await review.save();

    var totalRating=0;
    const product = await Product.findById(review.productId);
    const allReviews = await Product.findById(review.productId).populate("reviews");
    
    allReviews.reviews.forEach(item => {
    totalRating += item.rating;});
    
    product.avgRating=totalRating/product.reviews.length;
    await product.save();

    return review;
};

const deleteReview = async (userId, reviewId) => {
    const review = await Review.findById(reviewId);
    if(!review){
        throw new NotFoundError("Review not found");
    }
    const product= await Product.findById(review.productId);
    
    if(!product){
        throw new NotFoundError("Product not found");
    }
    
    const user= await User.findById(userId);
    
    // Ensure the user has the 'admin' role
    if ((user.role !== 'Admin') && (review.userId.toString() !== user._id.toString())) {
        throw new BadRequestError('Only admins and review creator can delete reviews');
    }

    await Review.findByIdAndDelete(reviewId);
    
    product.reviews = product.reviews.filter(
        (id) => id.toString() !== reviewId.toString()
    );
    await product.save();

    var totalRating=0;
    const allReviews = await Product.findById(review.productId).populate("reviews");
    
    allReviews.reviews.forEach(item => {
    totalRating += item.rating;});
    
    product.avgRating=totalRating/product.reviews.length;
    await product.save();

    user.reviews = user.reviews.filter(
        (id) => id.toString() !== reviewId.toString()
    );
    await user.save();
    return review;
};

module.exports = {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview,
};
