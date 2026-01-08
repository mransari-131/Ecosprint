const { NotFoundError, BadRequestError, ConflictError } = require("../errors/errors");
const userService = require("./user.service.js");
const Product = require("../models/product.model.js");
const {uploadImages, deleteImages} = require('../utils/image.upload.util.js');
const JsSearch = require("js-search");

const generateProductCode = async()=> {
    let id;
    do {
      id = Math.floor(100000000 + Math.random() * 900000000);
    } while (id % 10 === 0);
    return id;
  }

const createProduct = async (userId, productData, files) => {
    var productCodeString='ES';
    let productCode=0;
    let productCodeCheck=[];
    do {
        productCode = await generateProductCode();
    
        // Check if the generated product code already exists
        productCodeCheck = await Product.find({ productCode });
    } while (productCodeCheck.length > 0); // Repeat if the product code already exists


    const user= await userService.getUserById(userId);
    // Ensure the user has the 'admin' role
    if (user.role !== 'Admin') {
        throw new BadRequestError('Only admins can create products');
    }

    const imageURLs = await uploadImages(files);
    const product = new Product();
    product.productCode= productCodeString+productCode;
    product.productName=productData.productName;
    product.gender=productData.gender;
    product.category=productData.category;
    product.material=productData.material;
    product.color=productData.color;
    product.materialWeight=productData.materialWeight;
    product.stock=productData.stock;
    product.price=productData.price;
    product.salePrice=productData.salePrice;
    
    product.sizeType=productData.sizeType;
    product.size=productData.size;
    product.occasion=productData.occasion;
    product.season=productData.season;
    
    product.stockStatus=productData.stockStatus;
    product.description=productData.description;

    product.isNewArrival=productData.isNewArrival;
    product.isBestSeller=productData.isBestSeller;
    product.isOnSale=productData.isOnSale;
    product.specialCollection=productData.specialCollection;

    product.images=imageURLs;
    
    await product.save();
    return product;
};

const getProductById = async (productId) => {
    const product = await Product.findById(productId).populate({
        path: "reviews",
        populate: {
          path: "userId",
          select: ["profilePic", "name", "createdAt"]
        }
      });
    if(!product){
        throw new NotFoundError("Product not found");
    }
    return product;
};

const searchProduct = async (filters, sortBy, sortOrder, searchQuery) => {
    const query = {};

    // Apply filters
    if (filters.productCode) query.productCode = filters.productCode;
    if (filters.productName) query.productName = { $regex: new RegExp(filters.productName, "i") }; // Case-insensitive partial match
    if (filters.category) query.category = filters.category;
    if (filters.gender) query.gender = filters.gender;
    if (filters.material) query.material = filters.material;
    if (filters.occasion) query.occasion = filters.occasion;
    if (filters.season) query.season = filters.season;
    
    if (filters.isNewArrival) query.isNewArrival = filters.isNewArrival;
    if (filters.isBestSeller) query.isBestSeller = filters.isBestSeller;
    if (filters.isOnSale) query.isOnSale = filters.isOnSale;
    if (filters.specialCollection) query.specialCollection = filters.specialCollection;

    if (filters.availability === "exclude out of stock") {
        query.stockStatus = "in-stock";
    }

    // Advanced price filter (minPrice, maxPrice, or exactPrice)
    if (filters.minPrice || filters.maxPrice) {
        query.salePrice = {};
        if (filters.minPrice) query.salePrice.$gte = filters.minPrice;
        if (filters.maxPrice) query.salePrice.$lte = filters.maxPrice;
    }

    // Rating filter
    if (filters.rating === "4.0 and above") {
        query.averageRating = { $gte: 4 };
    } else if (filters.rating === "3.0 and above") {
        query.averageRating = { $gte: 3 };
    }

    // Define sorting
    const sortCriteria = {};
    if (sortBy) sortCriteria[sortBy] = sortOrder;

    // Query database with filters and sorting
    const filteredProducts = await Product.find(query)
        .sort(sortCriteria)
        .populate({
            path: "reviews",
            populate: {
                path: "userId",
                select: ["profilePic", "name", "createdAt"],
            },
        })
        .exec();

    if (!filteredProducts || filteredProducts.length === 0) {
        throw new NotFoundError("No product found matching the criteria.");
    }

    // If a search query is provided, use js-search for in-memory searching
    let finalResults = filteredProducts;
    if (searchQuery) {
        // Tokenize search input into words
        const searchTokens = searchQuery.split(" ");

        // Initialize js-search
        const searchEngine = new JsSearch.Search("productCode"); // Use a unique field for indexing

        // Configure search indexing fields
        searchEngine.indexStrategy = new JsSearch.AllSubstringsIndexStrategy(); // More flexible substring matching
        searchEngine.sanitizer = new JsSearch.LowerCaseSanitizer();
        searchEngine.searchIndex = new JsSearch.TfIdfSearchIndex();

        // Add weighted searchable fields
        searchEngine.addIndex("productName"); // High priority
        searchEngine.addIndex("description"); // Medium priority
        searchEngine.addIndex("category"); // Medium priority
        searchEngine.addIndex("description"); // Medium priority
        searchEngine.addIndex("gender"); // Medium priority
        searchEngine.addIndex("occasion"); // Medium priority
        searchEngine.addIndex("season"); // Medium priority
        searchEngine.addIndex("material"); // Medium priority
        searchEngine.addIndex("color"); // Low priority

        // Add the filtered results to the search index
        searchEngine.addDocuments(filteredProducts);

        // Perform the search for each token and merge results
        const searchResults = searchTokens.reduce((results, token) => {
            const partialResults = searchEngine.search(token);
            return [...results, ...partialResults];
        }, []);

        // Deduplicate and combine search results
        const uniqueSearchResults = Array.from(
            new Map(
                searchResults.map((item) => [item._id.toString(), item])
            ).values()
        );

        // Combine filtered and search results
        finalResults = uniqueSearchResults.filter((item) =>
            filteredProducts.some((j) => j._id.toString() === item._id.toString())
        );

        // Append additional search results that weren't in filtered results
        const searchResultIds = new Set(finalResults.map((item) => item._id.toString()));
        finalResults = [
            ...finalResults,
            ...uniqueSearchResults.filter((item) => !searchResultIds.has(item._id.toString())),
        ];
    }
    //console.log(finalResults);
    // Return final combined results
    return finalResults;
};


const updateProduct = async (userId, productId, productData, files) => {
    const user= await userService.getUserById(userId);
    // Ensure the user has the 'admin' role
    if (user.role !== 'Admin') {
        throw new BadRequestError('Only admins can update products');
    }
    const product = await Product.findById(productId);
    if(!product){
        throw new NotFoundError("Product not found");
    }
    if(productData.productName){
        product.productName=productData.productName;
    }
    if(productData.category){
        product.category=productData.category;
    }
    if(productData.material){
        product.material=productData.material;
    }
    if(productData.gender){
        product.gender=productData.gender;
    }
    if(productData.color){
        product.color=productData.color;
    }
    if(productData.occasion){
        product.occasion=productData.occasion;
    }
    if(productData.season){
        product.season=productData.season;
    }
    if(productData.stock){
        product.stock=productData.stock;
    }
    if(productData.price){
        product.price=productData.price;
    }
    if(productData.salePrice){
        product.salePrice=productData.salePrice;
    }
    if(productData.stockStatus){
        product.stockStatus=productData.stockStatus;
    }
    if(productData.description){
        product.description=productData.description;
    }
    if(productData.isNewArrival){
        product.isNewArrival=productData.isNewArrival;
    }
    if(productData.isBestSeller){
        product.isBestSeller=productData.isBestSeller;
    }
    if(productData.isOnSale){
        product.isOnSale=productData.isOnSale;
    }
    if(productData.specialCollection){
        product.specialCollection=productData.specialCollection;
    }
    if(files){
        const imageURLs = await uploadImages(files);
        product.productImages=imageURLs;
    }
    await product.save();

    return product;
};

const deleteProduct = async (userId, productId) => {
    const user= await userService.getUserById(userId);
    // Ensure the user has the 'admin' role
    if (user.role !== 'Admin') {
        throw new BadRequestError('Only admins can delete products');
    }
    const product = await Product.findById(productId);
    if(!product){
        throw new NotFoundError("Product not found");
    }
    // Delete associated images from Cloudinary
    if (product.productImages && product.productImages.length > 0) {
    //console.log(property.images.length);
       await deleteImages(product.productImages);
    }
    await Product.findByIdAndDelete(productId);
    
    return product;
};

module.exports = {
    createProduct,
    searchProduct,
    getProductById,
    updateProduct,
    deleteProduct,
};
