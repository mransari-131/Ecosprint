import axiosInstance from "../utils/axiosInstance";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { setAddresses, setError, setLoading } from '../store/addressSlice';

export const useAddresses = () => {
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const {addresses, loading, error} = useSelector(state => state.address);
  
    const fetchAddress = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axiosInstance.get(`/users/addresses`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(setAddresses(response.data));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error.response?.data || 'Error fetching cart'));
        dispatch(setLoading(false));
        throw error;
      }
    };
  
    const addAddress = async (pincode,flatHouseBuildingCompanyApartment,areaStreetSectorVillage,landmark,townCity, state) => {
      dispatch(setLoading(true));
      try {
        const response = await axiosInstance.post(
          `/address/add`, 
          { pincode, flatHouseBuildingCompanyApartment, areaStreetSectorVillage,landmark,townCity, state}, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error.response?.data || 'Error adding item'));
        dispatch(setLoading(false));
        throw error;
      }
    };

    const updateAddress = async (addressId, pincode,flatHouseBuildingCompanyApartment,areaStreetSectorVillage,landmark,townCity, state) => {
        dispatch(setLoading(true));
        try {
          const response = await axiosInstance.put(
            `/address/${addressId}/update`, 
            { pincode, flatHouseBuildingCompanyApartment, areaStreetSectorVillage, landmark, townCity, state}, 
            { headers: { Authorization: `Bearer ${token}` } }
          );
          dispatch(setLoading(false));
        } catch (error) {
          dispatch(setError(error.response?.data || 'Error adding item'));
          dispatch(setLoading(false));
          throw error;
        }
      };

      const deleteAddress = async (addressId) => {
        dispatch(setLoading(true));
        try {
          const response = await axiosInstance.delete(
            `/address/${addressId}/delete`, 
            { headers: { Authorization: `Bearer ${token}` } }
          );
          
          if(response.data){
            console.log("Address Deleted");
          };
          dispatch(setLoading(false));
        } catch (error) {
          dispatch(setError(error.response?.data || 'Error adding item'));
          dispatch(setLoading(false));
          throw error;
        }
      };
  
    return {
        addresses,
        loading,
        error,
      fetchAddress,
      addAddress,
      updateAddress,
      deleteAddress
    };
  };
  
  export default useAddresses;