const cityService = require("../services/city.service.js");
const logger = require("../configs/winston.config.js");

// Get cart by userId
const getCityDetails = async (req, res, next) => {
    try {
        const filters = {
            pincode: req.query.pincode,
            citytownvillage: req.query.citytownvillage,
            district: req.query.district,
            state: req.query.state,
          };
        const cityDetails = await cityService.getCityDetails(filters);
        res.status(200).json({success: true,
            data: cityDetails});
    } catch (error) {
        next(error);
    }
};

module.exports={getCityDetails};