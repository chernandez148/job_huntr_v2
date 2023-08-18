// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import jobDataReducer from './slices/jobData';
import favoriteJobDataReducer from './slices/favoriteJobData';
import newFavoriteJobDataReducer from './slices/newFavoriteJobData';
import remoteJobDataReducer from './slices/remoteJobData';
import locationDataReducer from './slices/locationData';
import cardHoverReducer from './slices/cardHover';
import userReducer from './slices/user';
import loginFormReducer from './slices/loginForm';
import signInToggleReducer from './slices/signInToggle';
import searchedJobDataReducer from './slices/searchedJobData';
import sliceIndexReducer from './slices/sliceIndex';
import selectedIndexReducer from './slices/selectedIndex';
import buttonDisabledReducer from './slices/buttonDisabled';
import isLoadingReducer from './slices/isLoading';

export const store = configureStore({
    reducer: {
        jobData: jobDataReducer,
        searchedJobData: searchedJobDataReducer,
        remoteJobData: remoteJobDataReducer,
        locationData: locationDataReducer,
        cardHover: cardHoverReducer,
        user: userReducer,
        loginForm: loginFormReducer,
        signInToggle: signInToggleReducer,
        sliceIndex: sliceIndexReducer,
        selectedIndex: selectedIndexReducer,
        favoriteJobData: favoriteJobDataReducer,
        newFavoriteJobData: newFavoriteJobDataReducer,
        buttonDisabled: buttonDisabledReducer,
        isLoading: isLoadingReducer
    }
});