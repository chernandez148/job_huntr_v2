// redux/locationData.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    locationData: {},
};

export const locationDataSlice = createSlice({
    name: 'locationData',
    initialState,
    reducers: {
        setLocationData: (state, action) => {
            state.locationData = action.payload;
        },
    },
});

export const { setLocationData } = locationDataSlice.actions;

export default locationDataSlice.reducer;