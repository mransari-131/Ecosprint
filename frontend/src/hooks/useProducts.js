import { setProducts, setError, setLoading, setSelectedProduct } from '../store/productSlice';
import axiosInstance from "../utils/axiosInstance";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../store/productSlice';

const useProducts = () => {

  const dispatch = useDispatch();

  const currentFilters = useSelector(state => state.products.filters);
  // Initialize with default values
  const defaultFilters = {
    category: [],
    gender: [],
    brand: [],
    material: [],
    color: [],
    occasion: [],
    season: [],
    searchQuery: '',
    priceRange: [0, 10000],
    availability: '',
    sortBy: '',
    sortOrder: '',
    isNewArrival: '',
    isBestSeller: '',
    isOnSale: '',
    specialCollection: ''
  };

  const [localFilters, setLocalFilters] = useState(defaultFilters);

  // Expanded sections state
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    gender: true,
    brand: true,
    material: true,
    color: true,
    occasion: true,
    season: true,
    price: true,
    availability: true,
    sortBy: true,
    sortOrder: true,
    searchQuery: true,
    isNewArrival: true,
    isBestSeller: true,
    isOnSale: true,
    specialCollection: true
  });

  // Filter categories (same as before)
  const filterCategories = {
    category: [ 'Loafers', 'Oxford', 'Slip-ins', 'Boots', 'Running Shoes', 'Walking Shoes', 'Sandals', 'Floaters', 'Flip Flops', 'Sports Shoes', 'Formal Shoes', 'Casual Shoes', 'Ethnic'],
    gender: ['Men', 'Women', 'Kids', 'Unisex'],
    brand: ['Nike', 'Adidas', 'Puma', 'Reebok', 'Vans'],
    material: ['Leather', 'Canvas', 'Mesh', 'Suede', 'Synthetic', 'Rubber', 'Fabric', 'Cotton', 'Nylon'],
    color: ['Black', 'Brown', 'White', 'Blue', 'Red', 'Green'],
    occasion: ['Casual', 'Formal', 'Sports', 'Party', 'Beach', 'Wedding', 'Work', 'Outdoor'],
    season: ['Summer', 'Winter', 'Monsoon', 'All Season'],
    availability: ['exclude out of stock'],
  };

  // Toggle section expand
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handle checkbox filter change
  const handleFilterChange = (category, value) => {
    const currentFilterList = localFilters[category] || [];
    const newFilterList = currentFilterList.includes(value)
      ? currentFilterList.filter(item => item !== value)
      : [...currentFilterList, value];

    const updatedFilters = {
      ...localFilters,
      [category]: newFilterList
    };

    setLocalFilters(updatedFilters);
  };

  // Handle price range change
  // const handlePriceChange = (value) => {
  //   const updatedFilters = {
  //     ...currentFilters,
  //     priceRange: value
  //   };

  //   dispatch(setFilters(updatedFilters)); // Dispatch updated filters to Redux
  //   fetchProducts(updatedFilters); // Fetch products with updated sorting
  // };

  const handlePriceChange = (value) => {
    const updatedFilters = {
      ...currentFilters,
      priceRange: value
    };
    setLocalFilters(updatedFilters);
    dispatch(setFilters(updatedFilters));
    fetchProducts(updatedFilters);
  };

  // Handle sorting change
const handleSortChange = (sortBy, sortOrder) => {
  const updatedFilters = {
    ...currentFilters,
    sortBy,
    sortOrder,
  };

  setLocalFilters(updatedFilters); // Update local state
  dispatch(setFilters(updatedFilters)); // Dispatch updated filters to Redux
  fetchProducts(updatedFilters); // Fetch products with updated sorting
};

const handleCheckChange = (category, value) => {
  const currentFilterList = currentFilters[category] || [];
  const newFilterList = currentFilterList.includes(value)
    ? currentFilterList.filter(item => item !== value)
    : [...currentFilterList, value];

  const updatedFilters = {
    ...currentFilters,
    [category]: newFilterList
  };

  setLocalFilters(updatedFilters);
  dispatch(setFilters(updatedFilters)); // Dispatch updated filters to Redux
  fetchProducts(updatedFilters); // Fetch products with updated sorting
};


  // Apply filters
  const applyFilters = () => {
    dispatch(setFilters(localFilters));
    fetchProducts(localFilters);
    onClose();
  };


  const createProduct = async (productData, files) => {
    dispatch(setLoading(true));
    try {
      const formData = new FormData();
      
      // Append product data
      Object.keys(productData).forEach(key => {
        formData.append(key, productData[key]);
      });
      
      // Append files
      if (files) {
        files.forEach(file => {
          formData.append('images', file);
        });
      }

      const response = await axiosInstance.post('/product/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create product';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getProductById = async (productId) => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.get(`/product/${productId}`);
      dispatch(setSelectedProduct(response.data));
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch product';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const updateProduct = async (productId, productData, files) => {
    dispatch(setLoading(true));
    try {
      const formData = new FormData();
      
      // Append product data
      Object.keys(productData).forEach(key => {
        formData.append(key, productData[key]);
      });
      
      // Append files
      if (files) {
        files.forEach(file => {
          formData.append('images', file);
        });
      }

      const response = await axiosInstance.put(`/product/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update product';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const deleteProduct = async (productId) => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.delete(`/product/${productId}`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete product';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Reset all filters
  const resetFilters = () => {
    const resetState = {
      category: [],
      gender: [],
      brand: [],
      material: [],
      color: [],
      occasion: [],
      season: [],
      priceRange: [0, 10000],
      sortBy: '',
      sortOrder: '',
      searchQuery: '',
      availability: '',
      isNewArrival: '',
      isBestSeller: '',
      isOnSale: '',
      specialCollection: ''
    };

    //setLocalFilters(resetState);
    dispatch(setFilters(resetState));
    fetchProducts(resetState);
    onClose();
  };

  const fetchProducts = async (filters = defaultFilters) => {
    try {
      dispatch(setLoading(true));
      
      // Create a clean filter payload by removing empty arrays and formatting price range
      const payload = {
        category: filters?.category?.length > 0 ? filters.category : undefined,
        gender: filters?.gender?.length > 0 ? filters.gender : undefined,
        brand: filters?.brand?.length > 0 ? filters.brand : undefined,
        material: filters?.material?.length > 0 ? filters.material : undefined,
        color: filters?.color?.length > 0 ? filters.color : undefined,
        occasion: filters?.occasion?.length > 0 ? filters.occasion : undefined,
        season: filters?.season?.length > 0 ? filters.season : undefined,
        searchQuery: filters?.searchQuery || '',
        minPrice: filters?.priceRange?.[0] || 0,
        maxPrice: filters?.priceRange?.[1] || 10000,
        availability: filters?.availability || '',
        sortBy: filters?.sortBy || '',
        sortOrder: filters?.sortOrder || '',
        isBestSeller: filters.isBestSeller? filters.isBestSeller : '',
        isNewArrival: filters.isNewArrival? filters.isNewArrival : '',
        specialCollection: filters.specialCollection? filters.specialCollection : '',
        isOnSale: filters.isOnSale? filters.isOnSale : '',
      };

      // Remove undefined values
      Object.keys(payload).forEach(key => {
        if (payload[key] === undefined) {
          delete payload[key];
        }
      });

      // Construct query parameters
      const queryParams = new URLSearchParams();
      
      // Add search query if exists
      if (payload.searchQuery) {
        queryParams.append('searchQuery', payload.searchQuery);
      }

      // Add filter parameters
      Object.entries(payload).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          // Handle array values (categories, brands, etc.)
          value.forEach(item => queryParams.append(key, item));
        } else if (key !== 'searchQuery' && value !== undefined) {
          // Handle non-array values (price range, etc.)
          queryParams.append(key, value);
        }
      });

      const response = await axiosInstance.get(`/search/products?${queryParams.toString()}`);

      if (!response.data) {
        throw new Error('No data received from server');
      }

      dispatch(setProducts(response.data));
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred while fetching products';
      console.error('Error fetching products:', errorMessage);
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Optional: Add a debounced version of fetchProducts for search queries
  const debouncedFetchProducts = (filters, delay = 500) => {
    let timeoutId;
    
    return (...args) => {
      clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        fetchProducts(filters);
      }, delay);
    };
  };

  return { 
    fetchProducts, 
    debouncedFetchProducts: debouncedFetchProducts(fetchProducts),
    defaultFilters, 
    handleSortChange,
    handleCheckChange, 
    currentFilters, 
    localFilters,  
    setLocalFilters, 
    expandedSections, 
    filterCategories, 
    toggleSection, 
    handleFilterChange, 
    handlePriceChange, 
    applyFilters, 
    resetFilters, 
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct};
};

export default useProducts;
