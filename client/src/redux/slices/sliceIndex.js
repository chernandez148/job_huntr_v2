// redux/sliceIndex.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sliceIndex: 8,
};

export const sliceIndexSlice = createSlice({
    name: 'sliceIndex',
    initialState,
    reducers: {
        setSliceIndex: (state, action) => {
            state.sliceIndex = action.payload;
        },
    },
});

export const { setSliceIndex } = sliceIndexSlice.actions;

export default sliceIndexSlice.reducer;