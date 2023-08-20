// redux/toggleDisplayCard.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    toggleDisplayCard: true,
};

export const toggleDisplayCardSlice = createSlice({
    name: 'toggleDisplayCard',
    initialState,
    reducers: {
        setToggleDisplayCard: (state, action) => {
            state.toggleDisplayCard = action.payload;
        },
    },
});

export const { setToggleDisplayCard } = toggleDisplayCardSlice.actions;

export default toggleDisplayCardSlice.reducer;