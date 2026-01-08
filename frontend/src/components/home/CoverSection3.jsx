import React from 'react';

import awards from "../../assets/images/db.jpg";

import da from "../../assets/images/db1.jpg";

const CoverSection3 = () => {
  return (
    <div className='w-full'>
          <div className='mt-3 bgc'>
                <br></br>
            <h2 className="text-lg sm:text-xl md:text-xl lg:text-1xl xl:text-1xl text-center font-bold uppercase">SHOP WITH CONFIDENCE AT THE ECOSPRINT ONLINE STORE </h2>
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

export default CoverSection3;
