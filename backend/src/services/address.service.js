const Address = require("../models/address.model.js");
const User = require("../models/user.model.js");
const {
    ConflictError,
    NotFoundError,
    BadRequestError,
  } = require("../errors/errors.js");

const createAddress = async (userId, addressData) => {
    const user = await User.findById(userId);
    if(!user){
        throw new NotFoundError("User not found");
    }
    const address=new Address();
    address.pincode=addressData.pincode;
    address.flatHouseBuildingCompanyApartment=addressData.flatHouseBuildingCompanyApartment;
    address.areaStreetSectorVillage=addressData.areaStreetSectorVillage;
    address.landmark=addressData.landmark;
    address.townCity=addressData.townCity;
    address.state=addressData.state;
    address.userId=userId;
    await address.save();
    user.address.push(address._id);
    await user.save();
    return address;
};

const getAllAddresses = async () => {
    return await Address.find();
};

const getAddressById = async (addressId) => {
    const address = await Address.findById(addressId);
    if(!address){
        throw new NotFoundError("Address not found");
    }
    return await Address.findById(addressId);
};

const updateAddress = async ( addressId, updateData) => {
    const address = await Address.findById(addressId);
    if(!address){
        throw new NotFoundError("Address not found");
    }
    if(updateData.pincode){
    address.pincode=updateData.pincode;
    }
    if(updateData.flatHouseBuildingCompanyApartment){
    address.flatHouseBuildingCompanyApartment=updateData.flatHouseBuildingCompanyApartment;
    }
    if(updateData.areaStreetSectorVillage){
    address.areaStreetSectorVillage=updateData.areaStreetSectorVillage;
    }
    if(updateData.landmark){
    address.landmark=updateData.areaStreetSectorVillage;
    }
    if(updateData.townCity){
    address.townCity=updateData.townCity;
    }
    if(updateData.state){
    address.state=updateData.state;
    }
    await address.save();

    return address;
};

const deleteAddress = async ( addressId) => {
    const address = await Address.findById(addressId);
    if(!address){
        throw new NotFoundError("Address not found");
    }
    await Address.findByIdAndDelete(addressId);
    const user = await User.findById(address.userId);
    if(!user){
        throw new NotFoundError("User not found");
    }
    user.address = user.address.filter(
        (id) => id.toString() !== addressId.toString()
    );
    await user.save();
    
    return address;
};

module.exports={createAddress, getAddressById, getAllAddresses, updateAddress, deleteAddress};
