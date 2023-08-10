// redux/cardHover.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cardHover: false,
};

export const cardHoverSlice = createSlice({
    name: 'cardHover',
    initialState,
    reducers: {
        setcardHover: (state, action) => {
            state.cardHover = action.payload;
        },
    },
});

export const { setcardHover } = cardHoverSlice.actions;

export default cardHoverSlice.reducer;