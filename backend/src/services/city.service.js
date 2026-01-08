const City = require('../models/city.model.js');
const { ConflictError, NotFoundError, BadRequestError } = require('../errors/errors.js')

const getCityDetails = async (inputData) => {
  const {pincode, citytownvillage, district, state}= inputData;
  // Search for cities that match the partial input
  const cityDetails = await City.find({
        pincode: { $regex: pincode, $options: 'i' }, 
        citytownvillage: {$regex: citytownvillage, $options: 'i'},
        district: { $regex: district, $options: 'i' }, 
        state: {$regex: state, $options: 'i'},
  });
  
  // If no cities found, return empty array
  if (cityDetails.length === 0) {
      throw new NotFoundError('No cities found');
  }

  return cityDetails;
  }

module.exports = {getCityDetails};