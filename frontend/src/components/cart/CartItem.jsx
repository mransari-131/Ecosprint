import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const totalAmount = item.price * item.quantity;

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 mb-4">
      <div className="p-3 sm:p-4 md:p-6">
        {/* Main Container */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 md:gap-6">
          {/* Image Section - Responsive width and maintains aspect ratio */}
          <div className="relative w-24 sm:w-28 md:w-32 aspect-square rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              {/* Product Details */}
              <div className="flex-1 space-y-2">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 line-clamp-2">
                  {item.name}
                </h3>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs sm:text-sm font-medium bg-emerald-50 text-emerald-700">
                    Size: {item.size}
                  </span>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-xs sm:text-sm text-gray-500">Unit Price:</span>
                    <span className="text-xs sm:text-sm text-emerald-600 font-semibold">
                      ₹{item.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Section with Controls and Price */}
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:gap-4 mt-2 sm:mt-0">
                {/* Quantity Controls */}
                <div className="flex items-center bg-gray-50 rounded-full p-1">
                  <button 
                    onClick={() => onUpdateQuantity(item.productId, item.quantity - 1, item.size)}
                    disabled={item.quantity <= 1}
                    className={`p-1.5 sm:p-2 rounded-full transition-colors duration-200 ${
                      item.quantity <= 1 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-gray-700 hover:bg-emerald-100 hover:text-emerald-700'
                    }`}
                  >
                    <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <span className="w-8 sm:w-12 text-center text-sm sm:text-base font-medium">
                    {item.quantity}
                  </span>
                  <button 
                    onClick={() => onUpdateQuantity(item.productId, item.quantity + 1, item.size)}
                    className="p-1.5 sm:p-2 rounded-full text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors duration-200"
                  >
                    <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>

                {/* Price and Remove Section */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="text-left">
                    <p className="text-xs sm:text-sm text-gray-500">Total</p>
                    <p className="font-semibold text-sm sm:text-base md:text-lg text-gray-900">
                      ₹{totalAmount.toLocaleString('en-IN')}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={() => onRemove(item.productId)}
                    className="group/remove relative p-1.5 sm:p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-800 rounded opacity-0 group-hover/remove:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      Remove item
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;