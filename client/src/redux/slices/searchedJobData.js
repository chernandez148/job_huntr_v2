// redux/searchedJobData.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchedJobData: {},
};

export const searchedJobDataSlice = createSlice({
    name: 'searchedJobData',
    initialState,
    reducers: {
        setSearchedJobData: (state, action) => {
            state.searchedJobData = action.payload;
        },
    },
});

export const { setSearchedJobData } = searchedJobDataSlice.actions;

export default searchedJobDataSlice.reducer;