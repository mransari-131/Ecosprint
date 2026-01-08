const User = require("../models/user.model.js");
const Product= require("../models/product.model.js");
const {
  ConflictError,
  NotFoundError,
  BadRequestError,
} = require("../errors/errors.js");
const { sendOTP, verifyOTP } = require("../utils/email.util.js");
const JWTToken = require("../utils/token.generation.util.js");
const hashValue = require("../utils/hashing.util.js");
const logger = require("../configs/winston.config.js");
const dotenv = require("dotenv");
const {uploadImage}= require("../utils/image.upload.util.js");

dotenv.config();

// Create a new user
const createUser = async (userData) => {
  const email = userData.email;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ConflictError("User with this email already exists");
  }

  const password = hashValue.hash(userData.password);

  const user = new User();
  user.name = userData.name;
  user.email = email;
  user.role = "User";
  user.password = password;
  //user.phone= userData.phone;
  user.isVerified = false;

  await user.save();
  //const response = await sendOTP(user.email);
  const response=JWTToken.generateToken(user);

  return { response, user }; // Return both user and token
};

const getAllUsers = async () => {
  const users = await User.find().exec();

  logger.error("error");
  return users;
};

const getUserById = async (userId) => {
  const user = await User.findById(userId).populate("address")
    //.populate("Order")
    .exec();
  if (!user) {
    throw new NotFoundError("User not found");
  }
  return user;
};

// Update user's name only
const updateUser = async (userId, updateData, files) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  const imageURLs = await uploadImage(files);

  if(updateData.name){
    user.name=updateData.name;
  }
  if(updateData.phone){
    user.phone=updateData.phone;
  }
  if(files){
    user.profilePic=imageURLs;
  }
  if(updateData.password){
    const password = hashValue.hash(updateData.password);
    user.password = password;
  }
  await user.save();

  return user;
};

const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  return user;
};

const changePassword = async (userId, passwordData) => {
  // Fetch the user by userId
  const user = await User.findById(userId);

  if (!user){
    throw new NotFoundError("User not found");
  }

  // Hash the provided old password and compare it with the stored hashed password
  const hashedOldPassword = hash(passwordData.oldPassword);
  if (hashedOldPassword !== user.password) {
    throw new BadRequestError("Old password is incorrect");
  }

  // Check if newPassword and confirmNewPassword are the same
  if (passwordData.newPassword !== user.password) {
    throw new BadRequestError("New password should not match old password");
  }

  // Check if newPassword and confirmNewPassword are the same
  if (passwordData.newPassword !== passwordData.confirmNewPassword) {
    throw new BadRequestError("New passwords do not match");
  }

  // Hash the new password before saving it
  user.password = hash(passwordData.newPassword);

  // Save the updated user
  return await user.save();
};

const resetPassword = async (userId, newPassword, confirmNewPassword) => {
  // Fetch the user by userId
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  if (newPassword == confirmNewPassword) {
    user.password = hashValue.hash(newPassword);
    await user.save();
  } else {
    throw new ConflictError(
      "New password and confirm new password should be same"
    );
  }

  const response = "Password has been reset successfully";
  return response;
};

const orders = async (userId) => {
    const user = await User.findById(userId)
    .populate("order").populate("userId")
    .exec();

    if(user.orders.length=='0'){
        throw new NotFoundError("No orders found");
    }
  
  return user.orders;
};

const wishlistProduct = async(userId) =>{
    const user = await User.findById(userId).populate("wishlist").exec();

    if(user.wishlist.length=='0'){
        throw new NotFoundError("No Products found");
    }
    return user.wishlist;
}

// Add a property to favorites
const addWishlistProduct = async (userId, productId) => {
    const wishlistProduct = await Product.findById(productId);
    if (!wishlistProduct) {
      throw new NotFoundError('Product not found');
    }
  
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
  
    // Check if the Product already exists in favorites
    if (user.wishlist.includes(productId)) {
      return { message: 'Product already in wishlist' };
    }
  
    user.wishlist.push(productId);
    await user.save();
    
    return wishlistProduct;
  };
  
  // Remove a Product from favorites
  const removeWishlistProduct = async (userId, productId) => {
    const wishlistProduct = await Product.findById(productId);
    if (!wishlistProduct) {
      throw new NotFoundError('Product not found');
    }
  
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
  
    // Check if the Product is not in favorites
    if (!user.wishlist.includes(productId)) {
      return { message: 'Product not in wishlist' };
    }
  
    // Filter out the Product from favoriteProperties
    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== productId.toString()
    );
    await user.save();
  
    return wishlistProduct;
  };

  const getUserAddresses = async(userId) => {
    const user = await User.findById(userId).populate("address").exec();
    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (user.address.length == 0) {
      throw new NotFoundError('No addresses found');
    }

    return user;
  }


module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  changePassword,
  resetPassword,
  orders,
  wishlistProduct,
  addWishlistProduct,
  removeWishlistProduct,
  getUserAddresses
};
