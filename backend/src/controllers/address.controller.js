const addressService = require("../services/address.service.js");
const logger = require("../configs/winston.config.js");

// Controller for creating a new Property
const createAddress = async (req, res, next) => {
  try {
    const address = await addressService.createAddress(req.user.id, req.body);
    res.status(201).json({
      success: true,
      data: address,
    });
  } catch (error) {
    //console.log(error);
    next(error);
  }
};

const getAddressById= async(req, res, next) =>{
    try{
        const addressId=req.params.id;
        const address= await addressService.getAddressById(addressId);
        //console.log(product);
        res.status(200).json({
            success: true,
            data: address,
          });
    }
    catch(error){
        next(error);
    }
}

const getAllAddresses= async(req, res, next) =>{
    try{
        const addresses= await addressService.getAllAddresses();
        res.status(200).json({
            success: true,
            data: addresses,
          });
    }
    catch(error){
      //console.log(error);
      next(error);
    }
};

// Update user by ID
const updateAddress = async (req, res, next) => {
    try {
      const updatedAddress = await addressService.updateAddress(req.params.id, req.body);
      res.status(200).json({
        success: true,
        data: updatedAddress,
      });
    } catch (error) {
      //console.log(error);
      next(error);
    }
  };
  
  // Delete user by ID
  const deleteAddress = async (req, res, next) => {
    try {
      const address = await addressService.deleteAddress(req.params.id);
      res.status(200).json({ message: "Address deleted successfully", address });
    } catch (error) {
      next(error);
    }
  };

module.exports ={createAddress, getAddressById, getAllAddresses, updateAddress, deleteAddress};