import React, { useState } from 'react';

const ProductImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* Main Image Container */}
      <div className="relative w-full aspect-square mb-4">
        <img
          src={images[selectedImage] || '/api/placeholder/600/600'}
          alt="Product"
          className="w-full h-full object-contain rounded-lg"
        />
      </div>
      
      {/* Thumbnails Container */}
      <div className="flex flex-wrap gap-2 mt-4">
        {images.map((image, index) => (
          <div 
            key={index}
            className={`relative w-[60px] h-[60px] min-w-[60px] border-2 rounded cursor-pointer 
              ${selectedImage === index ? 'border-blue-500' : 'border-transparent'}
              hover:border-blue-300 transition-colors`}
            onClick={() => setSelectedImage(index)}
          >
            <img 
              src={image} 
              alt={`Thumbnail ${index + 1}`} 
              className="w-full h-full object-cover rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;