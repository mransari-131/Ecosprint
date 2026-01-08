import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 w-full"
      onClick={handleProductClick}
    >
      {/* Image Container - Maintains aspect ratio across screen sizes */}
      <div className="relative pb-[100%] overflow-hidden group">
        <img
          src={product.images[0] || '/api/placeholder/300/300'}
          alt={product.productName}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Badges with responsive spacing and font sizes */}
        <div className="absolute top-0 left-0 w-full p-2 flex justify-between">
          {product.isNewArrival && (
            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs sm:text-sm">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs sm:text-sm ml-auto">
              Best Seller
            </span>
          )}
        </div>
      </div>

      {/* Content Container with responsive padding */}
      <div className="p-3 sm:p-4">
        {/* Product Name with responsive font size */}
        <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 line-clamp-2 min-h-[2.5em]">
          {product.productName}
        </h3>

        {/* Rating Section with responsive spacing and sizing */}
        <div className="flex items-center mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                  i < Math.floor(product.averageRating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-xs sm:text-sm text-gray-600">
            ({product.totalReviews})
          </span>
        </div>

        {/* Price Section with inline discount */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {product.salePrice ? (
            <>
              <span className="text-sm sm:text-base lg:text-lg font-semibold text-emerald-600">
                ₹{product.salePrice.toFixed(2)}
              </span>
              <span className="text-xs sm:text-sm text-gray-500 line-through">
                ₹{product.price.toFixed(2)}
              </span>
              <span className="bg-green-100 text-xs sm:text-sm text-green-800 px-2 py-0.5 rounded">
                {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
              </span>
            </>
          ) : (
            <span className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">
              ₹{product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;