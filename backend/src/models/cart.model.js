const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, default: 1 },
            size: {type: String},
            amount: {type: Number}
        },
    ],
},{timestamps: true});

const Cart = mongoose.model("Cart", cartSchema);
module.exports= Cart;
