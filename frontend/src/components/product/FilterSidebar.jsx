import React from 'react';
import { ChevronDown, Filter, X, ChevronUp } from 'lucide-react';
import useProducts from '../../hooks/useProducts';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../../store/productSlice';
import PriceRangeSlider from './PriceRangeSlider';

const FilterSidebar = ({ isOpen, onClose }) => {
  const { 
    fetchProducts, 
    currentFilters, 
    localFilters, 
    expandedSections, 
    filterCategories, 
    toggleSection, 
    handleFilterChange, 
    handlePriceChange, 
    applyFilters, 
    resetFilters,
    handleCheckChange,
    defaultFilters
  } = useProducts();

  const dispatch = useDispatch();
   // Create new handler for checkbox changes

   const handleCheckboxChange = (category, option) => {
    currentFilters(category, option);
    applyFilters(); // Apply filters immediately after change
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`${
          isOpen ? 'fixed inset-0 bg-black/50 z-40 md:hidden' : 'hidden'
        }`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <aside
        className={`
          fixed md:sticky md:top-16 
          ${isOpen ? 'right-0' : '-right-full md:right-0'}
          top-0 lg:mt-4 md:mt-4 md:top-auto
          h-full md:h-[calc(100vh-4rem)]
          w-[280px] md:w-60
          bg-white
          transition-all duration-300
          z-50 md:z-30
          flex flex-col
          shadow-lg md:shadow-none
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Filters</h2>
          
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* Price Range Section */}
            <div>
              <button
                onClick={() => toggleSection('price')}
                className="flex justify-between items-center w-full text-left"
              >
                <span className="text-base font-medium">Price Range</span>
                {expandedSections.price ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              {expandedSections.price && (
                <div className="mt-3">
                  <PriceRangeSlider
                    min={0}
                    max={10000}
                    step={100}
                    value={localFilters.priceRange}
                    onChange={handlePriceChange}
                  />
                </div>
              )}
            </div>

            {/* Filter Categories */}
            {Object.entries(filterCategories).map(([category, options]) => (
              <div key={category}>
                <button
                  onClick={() => toggleSection(category)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <span className="text-base font-medium capitalize">
                    {category}
                  </span>
                  {expandedSections[category] ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
                {expandedSections[category] && (
                  <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                    {options.map(option => (
                      <label
                        key={option}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                      
                         <input
                         type="checkbox"
                         onChange={() => handleCheckChange(category, option)}
                         className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        
      </aside>
    </>
  );
};

export default FilterSidebar;