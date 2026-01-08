import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  filters: {
    category: [],
    gender: [],
    material: [],
    color: [],
    occasion: [],
    season: [],
    priceRange: [0, 10000],
    searchQuery: '',
    sortBy: '',
    sortOrder: '',
    isNewArrival: '',
    isBestSeller: '',
    isOnSale: '',
    specialCollection: ''
  },
  loading: false,
  error: null,
  selectedProduct: null
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.data || [];
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { 
  setProducts, 
  setSelectedProduct,
  setFilters, 
  setLoading, 
  setError 
} = productSlice.actions;

export default productSlice.reducer;