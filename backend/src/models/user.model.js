const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String},
  password: {
        type: String,
        required: true,
        minlength: 6,
  },
  address: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address"
  }],
  isVerified: { type: Boolean, default: false},
  role: {type: String, enum: ["User","Admin"], default: 'User'},
  phone: { type: String},
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  }],
  orders: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Order" 
  }],
  profilePic: { type: String},
  reviews: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Review"
  }],
  cart:{
    type:mongoose.Schema.Types.ObjectId, 
    ref: "Cart" 
  },
},{timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;