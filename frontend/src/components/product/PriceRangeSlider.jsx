import React from 'react';

const PriceRangeSlider = ({ 
  min = 0, 
  max = 10000, 
  step = 100, 
  value, 
  onChange 
}) => {
  // Prevent min thumb from moving past max thumb & vice versa
  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value), value[1] - step);
    onChange([newMin, value[1]]);
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value), value[0] + step);
    onChange([value[0], newMax]);
  };

  // Calculate percentages for styling
  const minPercent = ((value[0] - min) / (max - min)) * 100;
  const maxPercent = ((value[1] - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col space-y-4">
      <div className="relative w-full h-12">
        {/* Base track */}
        <div className="absolute top-5 w-full h-2 bg-gray-200 rounded-full" />
        
        {/* Active track */}
        <div 
          className="absolute top-5 h-2 bg-emerald-700 rounded-full"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`
          }}
        />

        {/* Min range input */}
        <div className="absolute w-full">
          <input
            type="range"
            value={value[0]}
            min={min}
            max={max}
            step={step}
            onChange={handleMinChange}
            className="absolute w-full top-4 pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-400 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-emerald-700 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-emerald-700 [&::-moz-range-thumb]:cursor-pointer"
          />
        </div>

        {/* Max range input */}
        <div className="absolute w-full">
          <input
            type="range"
            value={value[1]}
            min={min}
            max={max}
            step={step}
            onChange={handleMaxChange}
            className="absolute w-full top-4 pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-400 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-emerald-700 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-emerald-700 [&::-moz-range-thumb]:cursor-pointer"
          />
        </div>
      </div>

      <div className="flex justify-between items-center space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Min Price</label>
          <input
            type="number"
            value={value[0]}
            onChange={handleMinChange}
            min={min}
            max={value[1] - step}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Max Price</label>
          <input
            type="number"
            value={value[1]}
            onChange={handleMaxChange}
            min={value[0] + step}
            max={max}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;