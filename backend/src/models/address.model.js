const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    pincode: { type: Number},
    flatHouseBuildingCompanyApartment: {type: String},
    areaStreetSectorVillage: {type: String},
    landmark: {type: String},
    townCity: {type: String},
    state: {type: String},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
},{timestamps: true})

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;