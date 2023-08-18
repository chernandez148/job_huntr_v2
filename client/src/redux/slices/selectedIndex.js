// redux/selectedIndex.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedIndex: 0,
};

export const selectedIndexSlice = createSlice({
    name: 'selectedIndex',
    initialState,
    reducers: {
        setSelectedIndex: (state, action) => {
            state.selectedIndex = action.payload;
        },
    },
});

export const { setSelectedIndex } = selectedIndexSlice.actions;

export default selectedIndexSlice.reducer;