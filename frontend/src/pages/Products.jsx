// pages/Products.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, X, ChevronDown, Star, Filter } from 'lucide-react';
import useProducts from '../hooks/useProducts';
import { setFilters } from '../store/productSlice';
import ProductHeader from '../components/product/ProductHeader';
import ProductCard from '../components/product/ProductCard';
import FilterSidebar from '../components/product/FilterSidebar';

const Products = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { products, loading, error } = useSelector(state => state.products);
  const { fetchProducts, localFilters, setLocalFilters, handleSortChange } = useProducts();
  
  useEffect(() => {
    // Check if we have initial filters from navigation
    const initialFilters = location.state?.initialFilters;
    
    if (initialFilters) {
      // Update local filters in the hook
      setLocalFilters(initialFilters);
      // Update Redux store
      dispatch(setFilters(initialFilters));
      // Fetch products with these filters
      fetchProducts(initialFilters);
    } else {
      // If no initial filters, fetch with default filters
      fetchProducts(localFilters);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-gray-100">
      <ProductHeader handleSortChange={handleSortChange} products={products}  setFilters={setFilters} />
      <div className="flex">
        <button
          className="fixed bottom-4 right-4 md:hidden z-50 bg-emerald-600 text-white p-4 rounded-full shadow-lg"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Filter size={24} />
        </button>

        <FilterSidebar 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 p-4">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : products?.length === 0 ? (
            <div className="text-center text-gray-600">No products found</div>
          ) : (
            <>
            
            <div className="grid grid-cols-1 size-m sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products?.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;