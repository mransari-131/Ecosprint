import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    addresses: [],
    loading: false,
    error: null
  },
  reducers: {
    setAddresses: (state, action) => {
      const addressesData = action.payload.data;
      state.addresses = addressesData.address.map(item => ({
        addressId: item._id,
        pincode: item.pincode ,
        flatHouseBuildingCompanyApartment: item.flatHouseBuildingCompanyApartment,
        areaStreetSectorVillage: item.areaStreetSectorVillage,
        landmark: item.landmark,
        townCity: item.townCity,
        state: item.state
      }));
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setAddresses, setLoading, setError } = addressSlice.actions;
export default addressSlice.reducer;