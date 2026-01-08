import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice'
import profileReducer from './profileSlice'
import addressReducer from './addressSlice'

// If you have more reducers, add them here
const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    order: orderReducer,
    profile: profileReducer,
    address: addressReducer
    // Add other reducers as you create them
    // e.g., 
    // cart: cartReducer,
    // user: userReducer
  },
});

export default store;
