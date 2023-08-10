// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import jobDataReducer from './slices/jobData';
import remoteJobDataReducer from './slices/remoteJobData';
import locationDataReducer from './slices/locationData';
import cardHoverReducer from './slices/cardHover';
import userReducer from './slices/user';
import loginFormReducer from './slices/loginForm';
import signInToggleReducer from './slices/signInToggle';

export const store = configureStore({
    reducer: {
        jobData: jobDataReducer,
        remoteJobData: remoteJobDataReducer,
        locationData: locationDataReducer,
        cardHover: cardHoverReducer,
        user: userReducer,
        loginForm: loginFormReducer,
        signInToggle: signInToggleReducer
    }
});