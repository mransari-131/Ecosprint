import React from 'react';

import awards from "../../assets/images/ad.jpg";
import award from "../../assets/images/ad1.jpg";

const CoverSection1 = () => {
  return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-2'>
      <div className='w-full aspect-w-16 aspect-h-9'>
        <img 
          className='w-full h-full object-cover' 
          src={awards} 
          alt="Awards image 1" 
        />
      </div>
      <div className='w-full aspect-w-16 aspect-h-9'>
        <img 
          className='w-full h-full object-cover' 
          src={award} 
          alt="Awards image 2" 
        />
      </div>
    </div>
  )
}

export default CoverSection1