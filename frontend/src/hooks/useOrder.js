import axiosInstance from "../utils/axiosInstance";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { setOrderItems, setError, setLoading } from '../store/orderSlice';

export const useOrder = () => {
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
  
    const fetchOrders = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axiosInstance.get(`/orders/user`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(setOrderItems(response.data));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error.response?.data || 'Error fetching cart'));
        dispatch(setLoading(false));
        throw error;
      }
    };

    const fetchAllOrders = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axiosInstance.get(`/orders/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(setOrderItems(response.data));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error.response?.data || 'Error fetching cart'));
        dispatch(setLoading(false));
        throw error;
      }
    };
  
    const createBuyNowOrder = async (addressId, productId, quantity,size) => {
      dispatch(setLoading(true));
      try {
        const response = await axiosInstance.post(
          `/orders/buy-now`, 
          { addressId, productId, quantity, size}, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        dispatch(setOrderItems(response.data));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error.response?.data || 'Error adding item'));
        dispatch(setLoading(false));
        throw error;
      }
    };

    const createCartOrder = async (addressId) => {
        dispatch(setLoading(true));
        try {
          const response = await axiosInstance.post(
            `/orders/cart`, 
            { addressId}, 
            { headers: { Authorization: `Bearer ${token}` } }
          );
          
          dispatch(setOrderItems(response.data));
          dispatch(setLoading(false));
        } catch (error) {
          dispatch(setError(error.response?.data || 'Error adding item'));
          dispatch(setLoading(false));
          throw error;
        }
      };

    const updateOrder = async (orderId, orderStatus) => {
        dispatch(setLoading(true));
        try {
          const response = await axiosInstance.put(
            `/orders/${orderId}/update`, 
            { orderStatus}, 
            { headers: { Authorization: `Bearer ${token}` } }
          );
          
          dispatch(setOrderItems(response.data));
          dispatch(setLoading(false));
        } catch (error) {
          dispatch(setError(error.response?.data || 'Error adding item'));
          dispatch(setLoading(false));
          throw error;
        }
      };

  
    return {
      fetchOrders,
      createBuyNowOrder,
      createCartOrder,
      updateOrder,
      fetchAllOrders
    };
  };
  
  export default useOrder;