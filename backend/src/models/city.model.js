const mongoose = require("mongoose");

const citiesSchema = new mongoose.Schema({
    pincode: { type: Number},
    citytownvillage: {type: String},
    district: {type: String},
    state: {type: String},
},{timestamps: true})

const City = mongoose.model('City', citiesSchema);
module.exports = City;