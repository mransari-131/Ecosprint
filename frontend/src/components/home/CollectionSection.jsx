import React from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper styles
import { Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import bestseller from "../../assets/images/bestseller.jpg";
import newarrivals from "../../assets/images/newarrivals.jpg";
import specialcollection from "../../assets/images/specialcollection.jpg";
import onsale from "../../assets/images/onsale.webp";
import slipperssandals from "../../assets/images/slipperssandals.jpg";
import Walkingshoes from "../../assets/images/Walkingshoes.jpg";

const CollectionSection = () => {
  const navigate = useNavigate();
  // Data for the category items
  const categories = [
    { id: 1, name: "New Arrivals", value: 'isNewArrival', image: newarrivals },
    { id: 2, name: "Best Seller", value: 'isBestSeller', image: bestseller },
    { id: 3, name: "Special Collection", value: 'specialCollection', image: specialcollection },
    { id: 4, name: "Top Discounts", value: 'isOnSale', image: onsale }
  ];

  const handleCollectionClick = (collectionValue) => {
    // Create initial filters object with all collections set to 'false'
    const initialFilters = {
      gender: [],
      category: [],
      brand: [],
      material: [],
      color: [],
      occasion: [],
      season: [],
      searchQuery: '',
      priceRange: [0, 10000],
      isNewArrival: '',
      isBestSeller: '',
      isOnSale: '',
      specialCollection: ''
    };

    // Set the clicked collection to 'true'
    initialFilters[collectionValue] = 'true';

    // Navigate to products page with the updated filters
    navigate('/products', { 
      state: { 
        initialFilters: initialFilters
      }
    });
  }

  return (
    <div className="w-11/12 mx-auto my-10 flex flex-col gap-5 max-sm:gap-2 ">
      <div className="flex flex-col gap-3 max-sm:gap-1 max-sm:items-center lg:mt-4">
      <div className=" font-sans text-primary-color text-center w-full">
      <div className="relative flex justify-center items-center w-full">
  
          <hr className="absolute w-full border-t-2 border-gray-300 z-0 hhr" />

          <h2 className="relative bg-white px-4 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl font-sans text-primary-color text-center font-semibold">
            Shop By Collection
          </h2>
      </div>
      <h5 className='mt-2 text-gray-500 sm:text-sm'>Curated collections for every step of your journey.</h5>

    </div>

      </div>

      <div className="my-5">
        <Swiper
          modules={[Navigation, Pagination]}
          //spaceBetween={30}
          arrow
          loop={true}
          pagination={false}
          breakpoints={{
            1280: {
              slidesPerView: 4,
            },
            1150: {
              slidesPerView: 3.2,
            },
            1000: {
              slidesPerView: 2.8,
            },
            820: {
              slidesPerView: 2.5,
            },
            600: {
              slidesPerView: 2.1,
            },
            470: {
              slidesPerView: 1.7,
            },
            370: {
              slidesPerView: 1.5,
            },
            280: {
              slidesPerView: 1.2,
            },
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
                <div onClick={() => handleCollectionClick(category.value)} className="mt-2 mb-3 m-2  flex flex-col items-center shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300">
                <img
                className="w-full h-full object-cover"
                src={category.image}
                alt={category.name}
                />
                <div className="mt-2 mb-3 lg:text-xl md:text-xl text-center sm:text-sm">{category.name}</div>
              </div>
            </SwiperSlide>
            
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CollectionSection;
