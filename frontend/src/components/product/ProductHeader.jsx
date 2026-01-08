import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import useProducts from '../../hooks/useProducts';

const ProductHeader = ({ handleSortChange, products, setFilters }) => {
  const { 
    resetFilters,
  } = useProducts();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ value: '', label: 'Sort By' });
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sortOptions = [
    { value: 'salePrice', order: 'Low to High', label: 'Price: Low to High' },
    { value: 'salePrice', order: 'High to Low', label: 'Price: High to Low' },
    { value: 'rating', order: 'Low to High', label: 'Rating: Low to High' },
    { value: 'rating', order: 'High to Low', label: 'Rating: High to Low' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortByClick = (option) => {
    handleSortChange(option.value, option.order); // Apply sorting
    //setSelectedOption(sortOptions.find(opt => opt.value === option.value && opt.sortOrder === option.order));
    setIsOpen(false);
  };

  return (
    <>
    <div className='flex flex-col justify-between sm:flex-row'>
    <div className=" lg:text-2xl lg:ml-12 lg:mt-7 md:text-2xl md:ml-12 md:mt-7 sm:text-xl sm:ml-8 sm:mt-4 sm:mr-6 text-sm mr-6 ml-5 mt-7 font-semibold text-gray-600">Showing Results: {products.length} products found</div>
    
    <div className="mt-4 ml-4 relative inline-flex gap-2 text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-2 py-2 text-left bg-white border rounded-lg shadow-sm hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-50 flex justify-between items-center"
      >
        {selectedOption.label} <ChevronDown className="w-4 h-4 ml-2" />
      </button>
      {isOpen && (
        <div className="absolute p-2 mt-12 w-48 bg-white border rounded-lg shadow-lg z-10 lg:right-5">
          {sortOptions.map((option) => (
            <button
              key={option.value + option.order}
              onClick={() => handleSortByClick(option)}
              className={`w-full px-4 py-2 text-left hover:bg-emerald-50 ${
                selectedOption.value === option.value && selectedOption.order === option.order
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
      <div className="border-t bg-white h-full mr-3 rounded-lg">
          <div className=" text-left">
            <button
              onClick={resetFilters}
              className="px-2 py-2 bg-white hover:bg-emerald-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <p className=''>Clear Filters</p>
            </button>
          </div>
        </div>
    </div>
    </div>
    </>
  );
};

export default ProductHeader;
