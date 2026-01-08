import React from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper styles
import { Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import casualsneakers from "../../assets/images/casualsneakers.jpg";
import Walkingshoes from "../../assets/images/Walkingshoes.jpg";
import Slipins from "../../assets/images/Slipins.jpg";
import loafers from "../../assets/images/loafers.jpg";
import formal from "../../assets/images/formal.jpeg";
import sandals from "../../assets/images/slipperssandals.jpg";

import oxford from "../../assets/images/oxford.jpg";
import running from "../../assets/images/running.jpeg";
import ethnic from "../../assets/images/ethnic.jpg";
import boots from "../../assets/images/boots.jpeg";
import sports from "../../assets/images/sports.jpeg";
import flipflops from "../../assets/images/flipflops.jpeg";
import floaters from "../../assets/images/floaters.jpg";

const CategorySection = () => {
  const navigate = useNavigate();
  // Data for the category items
  const categories = [
    { id: 1, name: "Casual Shoes", image: casualsneakers },
    { id: 2, name: "Walking Shoes", image: Walkingshoes },
    { id: 3, name: "Slip-ins", image: Slipins },
    { id: 4, name: "Loafers", image: loafers },
    { id: 5, name: "Sandals", image: sandals },
    { id: 6, name: "Formal Shoes", image: formal },
  ];

  const categories1 = [
    { id: 1, name: "Oxford", image: oxford },
    { id: 2, name: "Running Shoes", image: running },
    { id: 3, name: "Ethnic", image: ethnic },
    { id: 4, name: "Boots", image: boots },
    { id: 5, name: "Flip Flops ", image: flipflops },
    { id: 6, name: "Sports Shoes", image: sports },
    { id: 7, name: "Floaters", image: floaters },
  ];

  const handleCategoryClick = (type) => {
    navigate('/products', { 
      state: { 
        initialFilters: {
          gender: [],
          category: [type],
          brand: [],
          material: [],
          color: [],
          occasion: [],
          season: [],
          searchQuery: '',
          priceRange: [0, 10000]
        }
      }
    });
  };

  return (
    <div className="w-11/12 mx-auto my-10 flex flex-col gap-5 max-sm:gap-2">
      <div className="flex flex-col gap-3 max-sm:gap-1 max-sm:items-center">
      <div className=" font-sans text-primary-color text-center w-full">
      <div className="relative flex justify-center items-center w-full">
  {/* HR for all screen sizes */}
  <hr className="absolute w-full border-t-2 border-gray-300 z-0 hhr" />

  {/* Heading (Always Visible) */}
  <h2 className="relative bg-white px-4 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl font-sans text-primary-color text-center font-semibold">
    Shop By Category
  </h2>
  
</div>
<h5 className='mt-2 text-gray-500 sm:text-sm'>Step into style, find your perfect fit.</h5>

    </div>

      </div>

      <div className="my-5">
        <Swiper
          modules={[Navigation, Pagination]}
          //spaceBetween={30}
          loop={true}
          pagination={false}
          breakpoints={{
            1280: {
              slidesPerView: 5.1,
            },
            1150: {
              slidesPerView: 4.5,
            },
            1000: {
              slidesPerView: 4.1,
            },
            820: {
              slidesPerView: 3.5,
            },
            600: {
              slidesPerView: 3.1,
            },
            470: {
              slidesPerView: 2.5,
            },
            370: {
              slidesPerView: 2.3,
            },
            280: {
              slidesPerView: 2.2,
            },
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <div onClick={() => handleCategoryClick(category.name)} className="mt-2 mb-3 m-3 flex flex-col items-center shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300">
                <img
                  className="w-full h-full object-cover"
                  src={category.image}
                  alt={category.name}
                />
                <div className="mt-2 mb-3 lg:text-xl md:text-xl text-center sm:text-sm ">{category.name}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="my-5">
        <Swiper
          modules={[Navigation, Pagination]}
          //spaceBetween={30}
          loop={true}
          pagination={false}
          breakpoints={{
            1280: {
              slidesPerView: 5.1,
            },
            1150: {
              slidesPerView: 4.5,
            },
            1000: {
              slidesPerView: 4.1,
            },
            820: {
              slidesPerView: 3.5,
            },
            600: {
              slidesPerView: 3.1,
            },
            470: {
              slidesPerView: 2.5,
            },
            370: {
              slidesPerView: 2.3,
            },
            280: {
              slidesPerView: 2.2,
            },
          }}
        >
          {categories1.map((category) => (
            <SwiperSlide key={category.id}>
              <div onClick={() => handleCategoryClick(category.name)} className="mt-2 mb-3 m-3 flex flex-col items-center shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300">
                <img
                  className="w-full h-full object-cover"
                  src={category.image}
                  alt={category.name}
                />
                <div className="mt-2 mb-3 lg:text-xl md:text-xl text-center sm:text-sm ">{category.name}</div>
              </div>
          </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CategorySection;
