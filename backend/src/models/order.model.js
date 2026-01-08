const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderCode: { type: String, required: true },
    addressId: { type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true },
    deliveryDate: {type: Date},
    returnWindowDate: {type: Date},
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product"},
            quantity: { type: Number},
            size:{type: String},
            amount: {type: Number}
        },
    ],
    totalAmount: { type: Number, required: true },
    paymentId: { type: String },
    paymentStatus: { type: String, default: "Pending" }, // Pending, Paid, Failed
    orderStatus: {type: String, default: "Order Processing", enum: ["Order Processing","Order Confirmed", "Order Packed", "Order Shipped", "Out of Delivery", "Order Completed", "Order Cancelled", "Order Replacement Requested", "Order Replacement Approved","Replacement Order Processing","Replacement Order Packed", "Replacement Order Shipped", "Replacement Order Out of Delivery", "Replacement Order Completed"]},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

orderSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Order = mongoose.model("Order", orderSchema);
module.exports= Order;
