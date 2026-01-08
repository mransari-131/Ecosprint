const mongoose = require('mongoose');

// Product Schema
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true
  },
  productCode:{
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Floaters', 'Loafers', 'Oxford', 'Slip-ins', 'Boots', 'Running Shoes', 'Walking Shoes', 'Sandals', 'Flip Flops', 'Sports Shoes', 'Formal Shoes', 'Casual Shoes', 'Ethnic']
  },
  gender: {
    type: String,
    enum: ['Men', 'Women', 'Kids', 'Unisex'],
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  salePrice: {
    type: Number,
    min: 0
  },
  images: [{
    type: String,
  }],
  stockStatus: {type: String, required: true, default: 'in-stock'}, // e.g., in-stock, out-of-stock //excludes out of stock
  sizeType: {
    type: String,
    enum: ['UK', 'US', 'EU'],
    required: true
  },
  size: {
    type: Number,
  },
  stock: {
    type: Number,
    min: 0
  },
  material: {
    type: String,
    enum: ['Leather', 'Canvas', 'Mesh', 'Suede', 'Synthetic', 'Rubber', 'Fabric', 'Cotton', 'Nylon'],
    required: true
  },
  color: {
    type: String,
    enum: ['Black', 'Brown', 'White', 'Blue', 'Red', 'Green', 'Yellow', 'Grey', 'Multi-color'],
    required: true
  },
  occasion: {
    type: String,
    enum: ['Casual', 'Formal', 'Sports', 'Party', 'Beach', 'Wedding', 'Work', 'Outdoor']
  },
  season: {
    type: String,
    enum: ['Summer', 'Winter', 'Monsoon', 'All Season']
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0,
    min: 0
  },
  reviews: [{type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }],
    orders: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Order" 
  }],
    isNewArrival: {
      type: Boolean,
      default: false
    },
    isBestSeller: {
      type: Boolean,
      default: false
    },
    isOnSale: {
      type: Boolean,
      default: false
    },
    specialCollection: {
      type: Boolean,
      default: false
    }
}, {
  timestamps: true
});

const Product = mongoose.model("Product", productSchema);
module.exports= Product;


