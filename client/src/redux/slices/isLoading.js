// redux/isLoading.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
};

export const isLoadingSlice = createSlice({
    name: 'isLoading',
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setIsLoading } = isLoadingSlice.actions;

export default isLoadingSlice.reducer;