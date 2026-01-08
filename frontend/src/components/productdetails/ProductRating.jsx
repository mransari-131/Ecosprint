import React from 'react';
import { Star } from 'lucide-react';

const ProductRating = ({ averageRating, totalReviews }) => {
  const renderStarRating = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="flex items-center mt-4">
      <div className="flex">{renderStarRating(averageRating)}</div>
      <span className="ml-2 text-gray-600">
        ({totalReviews} reviews)
      </span>
    </div>
  );
};

export default ProductRating;