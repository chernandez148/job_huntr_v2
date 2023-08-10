// redux/loginForm.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loginForm: false,
};

export const loginFormSlice = createSlice({
    name: 'loginForm',
    initialState,
    reducers: {
        setLoginForm: (state, action) => {
            state.loginForm = action.payload;
        },
    },
});

export const { setLoginForm } = loginFormSlice.actions;

export default loginFormSlice.reducer;