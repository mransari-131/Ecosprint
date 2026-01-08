import axiosInstance from "../utils/axiosInstance";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { setCartItems, setError, setLoading } from '../store/cartSlice';

export const useCart = () => {
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const { items, total, loading, error } = useSelector(state => state.cart);
  
    const fetchCart = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axiosInstance.get(`/cart/user`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(setCartItems(response.data));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error.response?.data || 'Error fetching cart'));
        dispatch(setLoading(false));
        throw error;
      }
    };
  
    const addItem = async ( productId, selectedSize) => {
      const quantity=1;
      const size=selectedSize;
      dispatch(setLoading(true));
      try {
        const response = await axiosInstance.post(
          `/cart/user/item`, 
          { productId, quantity, size }, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        dispatch(setCartItems(response.data));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error.response?.data || 'Error adding item'));
        dispatch(setLoading(false));
        throw error;
      }
    };
  
    const updateItem = async ( productId, quantity, size) => {
      dispatch(setLoading(true));
      
      try {
        const response = await axiosInstance.put(
          `/cart/user/item`, 
          { productId, quantity , size}, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(setCartItems(response.data));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error.response?.data || 'Error updating item'));
        dispatch(setLoading(false));
        throw error;
      }
    };
  
    const removeItem = async ( productId) => {
      dispatch(setLoading(true));
      try {
        const response = await axiosInstance.delete(
          `/cart/user/item/${productId}`, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(setCartItems(response.data));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error.response?.data || 'Error removing item'));
        dispatch(setLoading(false));
        throw error;
      }
    };
  
    const clearCart = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axiosInstance.delete(
          `/cart/user`, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(setCartItems({ items: [], total: 0 }));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error.response?.data || 'Error clearing cart'));
        dispatch(setLoading(false));
        throw error;
      }
    };
  
    return {
      items,
      total,
      loading,
      error,
      fetchCart,
      addItem,
      updateItem,
      removeItem,
      clearCart
    };
  };
  
  export default useCart;