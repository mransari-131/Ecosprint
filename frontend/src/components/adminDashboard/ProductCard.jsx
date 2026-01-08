import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Edit, Trash2, Star } from 'lucide-react';
import ProductEditForm from './ProductEditForm';

const ProductCard = ({ product, onEdit, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleEdit = () => {
        setIsEditModalOpen(true);
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow-md p-4 mb-4" onClick={() => setIsExpanded(!isExpanded)}>
                {/* Header Section */}
                <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row justify-between items-start w-full p-4">
    {/* Product Info Container */}
    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 w-full">
        {/* Product Image */}
        <img 
            src={product.images?.[0] || "/fallback-image.jpg"} 
            alt={product.productName} 
            className="w-20 h-20 object-contain rounded"
        />
        
        {/* Product Details */}
        <div className="flex flex-col space-y-2 flex-grow">
            <h3 className="font-semibold text-lg">{product.productName}</h3>
            <p className="text-sm text-gray-600">SKU Code: {product.productCode}</p>
            
            {/* Tags Container */}
            <div className="flex flex-wrap gap-2">
                {product.isNewArrival && (
                    <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        New
                    </span>
                )}
                {product.isBestSeller && (
                    <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        Best Seller
                    </span>
                )}
                {product.isOnSale && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        Sale
                    </span>
                )}
            </div>
        </div>
    </div>

    {/* Expand/Collapse Button */}
    <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        aria-label={isExpanded ? "Collapse details" : "Expand details"}
    >
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
           </div>

                {/* Expanded Details */}
                {isExpanded && (
                    <div className="mt-4 border-t pt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <p><span className="font-semibold">Category:</span> {product.category}</p>
                                <p><span className="font-semibold">Gender:</span> {product.gender}</p>
                                <p><span className="font-semibold">Material:</span> {product.material}</p>
                                <p><span className="font-semibold">Color:</span> {product.color}</p>
                                <p><span className="font-semibold">Occasion:</span> {product.occasion}</p>
                            </div>
                            <div>
                                <p><span className="font-semibold">Price:</span> ₹{product.price}</p>
                                <p><span className="font-semibold">Sale Price:</span> {product.salePrice ? `₹${product.salePrice}` : "N/A"}</p>
                                <p><span className="font-semibold">Stock:</span> {product.stock}</p>
                                <p><span className="font-semibold">Status:</span> {product.stockStatus}</p>
                                <p className="flex items-center font-semibold">Rating: 
                
                                    <Star className="text-yellow-500 w-4 h-4 mr-1" />
                                     {product.averageRating} ({product.totalReviews} reviews)
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-4 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                            <button 
                                onClick={handleEdit}
                                className="flex items-center justify-center px-3 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                            >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                            </button>
                            <button 
                                onClick={() => onDelete(product._id)}
                                className="flex items-center justify-center px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            <ProductEditForm
                product={product}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onUpdate={onEdit}
            />
        </>
    );
};

export default ProductCard;
