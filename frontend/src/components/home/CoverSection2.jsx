import React from 'react';

import awards from "../../assets/images/Desktop.jpg";
import da from "../../assets/images/da.jpg";

const CoverSection2 = () => {
  return (
    <div className='w-full'>
      <div className='mt-3 cbg text-slate-50'>
            <br></br>
        <h2 className="text-lg sm:text-xl md:text-xl lg:text-1xl xl:text-1xl text-center font-bold uppercase">Love and Trust of Millions of Indians made this possible </h2>
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
                  src={da} 
                  alt="Awards image 2" 
                />
              </div>
            </div>
    </div>
    </div>
  )
}

export default CoverSection2