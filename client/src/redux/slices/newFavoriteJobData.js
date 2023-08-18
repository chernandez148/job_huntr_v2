// redux/newFavoriteJobData.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    newFavoriteJobData: [],
};

export const newFavoriteJobDataSlice = createSlice({
    name: 'newFavoriteJobData',
    initialState,
    reducers: {
        setNewFavoriteJobData: (state, action) => {
            state.newFavoriteJobData = action.payload;
        },
    },
});

export const { setNewFavoriteJobData } = newFavoriteJobDataSlice.actions;

export default newFavoriteJobDataSlice.reducer;