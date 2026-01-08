import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0,
    loading: false,
    error: null
  },
  reducers: {
    setCartItems: (state, action) => {
      const cartData = action.payload.data;
      state.items = cartData.items.map(item => ({
        productId: item.productId._id,
        name: item.productId.productName,
        price: item.productId.salePrice,
        size: item.size,
        image: item.productId.images[0],
        quantity: item.quantity,
        amount: item.amount
      }));
      state.total = cartData.items.reduce((sum, item) => sum + item.amount, 0);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setCartItems, setLoading, setError } = cartSlice.actions;
export default cartSlice.reducer;