// redux/signInToggle.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    signInToggle: true,
};

export const signInToggleSlice = createSlice({
    name: 'signInToggle',
    initialState,
    reducers: {
        setSignInToggle: (state, action) => {
            state.signInToggle = action.payload;
        },
    },
});

export const { setSignInToggle } = signInToggleSlice.actions;

export default signInToggleSlice.reducer;