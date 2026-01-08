const productService = require("../services/product.service.js");
const logger = require("../configs/winston.config.js");

// Controller for creating a new Property
const createProduct = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const propertyData = req.body;
    const files = req.files;
    const product = await productService.createProduct(
      userId,
      propertyData,
      files
    );
    logger.info(
      "User ID:" +
        `${userId}` +
        " has posted Product ID:" +
        `${product._id}` +
        " successfully"
    );
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    //console.log(error);
    next(error);
  }
};

const getProductById= async(req, res, next) =>{
    try{
        const productId=req.params.id;
        const product= await productService.getProductById(productId);
        res.status(200).json({
            success: true,
            data: product,
          });
    }
    catch(error){
        next(error);
    }
}

const searchProduct= async(req, res, next) =>{
    try{
        const filters = {
            productCode: req.query.productCode,
            productName: req.query.productName,
            category: req.query.category,
            gender: req.query.gender,
            material: req.query.material,
            color: req.query.color,
            occasion: req.query.occasion,
            season: req.query.season,
            isNewArrival: req.query.isNewArrival,
            isBestSeller: req.query.isBestSeller,
            isOnSale: req.query.isOnSale,
            specialCollection: req.query.specialCollection,
            availability: req.query.availability,
            minPrice: req.query.minPrice,
            maxPrice: req.query.maxPrice,
            rating: req.query.rating
          };
      
          // Access sorting parameters from the query
          const sortBy = req.query.sortBy; // price or dateListed
          const sortOrder = req.query.sortOrder === "High to Low" ? -1 : 1; // 'desc' for descending, 'asc' or default for ascending
        const product= await productService.searchProduct(filters, sortBy, sortOrder, req.query.searchQuery);
        res.status(200).json({
            success: true,
            data: product,
          });
    }
    catch(error){
      //console.log(error);
      next(error);
    }
};

// Update user by ID
const updateProduct = async (req, res, next) => {
    try {
      const updatedProduct = await productService.updateProduct(req.user.id, req.params.id, req.body, req.files);
      logger.info(
        "Product id:" + `${updatedProduct._id}` + " has been updated successfully"
      );
      res.status(200).json({
        success: true,
        data: updatedProduct,
      });
    } catch (error) {
      //console.log(error);
      next(error);
    }
  };
  
  // Delete user by ID
  const deleteProduct = async (req, res, next) => {
    try {
      const product = await productService.deleteProduct(req.user.id, req.params.id);
      logger.info(
        "Product id:" + `${req.params.id}` + " has been deleted successfully"
      );
      res.status(200).json({ message: "Product deleted successfully", product });
    } catch (error) {
      next(error);
    }
  };

module.exports ={createProduct, getProductById, searchProduct, updateProduct, deleteProduct};