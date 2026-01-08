import React from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper styles
import { Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import men from "../../assets/images/men.jpg";
import women from "../../assets/images/women.jpg";
import kids from "../../assets/images/kids.jpg";

const GenderSection = () => {
  const navigate = useNavigate();
  // Data for the category items
  const categories = [
    { id: 1, name: "Men", image: men },
    { id: 2, name: "Women", image: women },
    { id: 3, name: "Kids", image: kids },
  ];

  const handleGenderClick = (gender) => {
    navigate('/products', { 
      state: { 
        initialFilters: {
          gender: [gender],
          category: [],
          brand: [],
          material: [],
          color: [],
          occasion: [],
          season: [],
          searchQuery: '',
          priceRange: [0, 10000],
          isBestSeller: '',
          isOnSale: '',
          specialCollection: '',
          isNewArrival: '',
        }
      }
    });
  };

  return (
    <div className="w-11/12 mx-auto my-10 flex flex-col gap-5 max-sm:gap-2 ">
      <div className="flex flex-col gap-3 max-sm:gap-1 max-sm:items-center lg:mt-4">
      <div className=" font-sans text-primary-color text-center w-full">
      <div className="relative flex justify-center items-center w-full">
  
          <hr className="absolute w-full border-t-2 border-gray-300 z-0" />

          <h2 className="relative bg-white px-4 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl font-sans text-primary-color text-center font-semibold">
            Shop By Gender
          </h2>
      </div>
      <h5 className='mt-2 text-gray-500 sm:text-sm'>Footwear that matches your unique style.</h5>
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
              slidesPerView: 3,
            },
            1150: {
              slidesPerView: 2.7,
            },
            1000: {
              slidesPerView: 2.5,
            },
            820: {
              slidesPerView: 2.2,
            },
            600: {
              slidesPerView: 1.8,
            },
            470: {
              slidesPerView: 1.5,
            },
            370: {
              slidesPerView: 1.2,
            },
            280: {
              slidesPerView: 1.2,
            },
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
                <div onClick={() => handleGenderClick(category.name)} className="mt-2 mb-3  m-2 flex flex-col items-center shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300">
                <img
                className="w-70 h-70 object-cover"
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

export default GenderSection;
