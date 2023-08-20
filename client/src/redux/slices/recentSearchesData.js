// redux/recentSearchesData.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    recentSearchesData: [],
};

export const recentSearchesDataSlice = createSlice({
    name: 'recentSearchesData',
    initialState,
    reducers: {
        setRecentSearchesData: (state, action) => {
            state.recentSearchesData = action.payload;
        },
    },
});

export const { setRecentSearchesData } = recentSearchesDataSlice.actions;

export default recentSearchesDataSlice.reducer;