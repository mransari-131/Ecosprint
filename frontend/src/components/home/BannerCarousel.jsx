import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import images using import statement (for assets in src folder)
import banner1 from "../../assets/images/banner1.avif";
import banner2 from "../../assets/images/banner2.avif";
import banner3 from "../../assets/images/banner3.webp";
import banner4 from "../../assets/images/banner4.webp";
import banner5 from "../../assets/images/banner5.webp";

const BannerCarousel = () => {
  const navigate = useNavigate(); 
  const images = [banner1, banner2, banner3, banner4, banner5]; // Use imported images

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length]);

  const handleImageClick = () => {
    navigate("/products"); // Navigate to the "Products" page
  };

  return (
    <div className="relative w-full h-[98%] overflow-hidden">
      <img
        onClick={handleImageClick} 
        src={images[currentIndex]}
        alt="Banner"
        className="w-full object-cover transition-opacity duration-1000 ease-in-out"
      />
    </div>
  );
};

export default BannerCarousel;
