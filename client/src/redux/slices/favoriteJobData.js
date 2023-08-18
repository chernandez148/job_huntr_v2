// redux/favoriteJobData.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favoriteJobData: {},
};

export const favoriteJobDataSlice = createSlice({
    name: 'favoriteJobData',
    initialState,
    reducers: {
        setFavoriteJobData: (state, action) => {
            state.favoriteJobData = action.payload;
        },
    },
});

export const { setFavoriteJobData } = favoriteJobDataSlice.actions;

export default favoriteJobDataSlice.reducer;