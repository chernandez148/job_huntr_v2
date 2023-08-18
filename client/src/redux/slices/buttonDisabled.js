// redux/buttonDisabled.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    buttonDisabled: false,
};

export const buttonDisabledSlice = createSlice({
    name: 'buttonDisabled',
    initialState,
    reducers: {
        setButtonDisabled: (state, action) => {
            state.buttonDisabled = action.payload;
        },
    },
});

export const { setButtonDisabled } = buttonDisabledSlice.actions;

export default buttonDisabledSlice.reducer;