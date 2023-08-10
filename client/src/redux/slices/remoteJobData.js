// redux/remoteJobData.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    remoteJobData: {},
};

export const remoteJobDataSlice = createSlice({
    name: 'remoteJobData',
    initialState,
    reducers: {
        setRemoteJobData: (state, action) => {
            state.remoteJobData = action.payload;
        },
    },
});

export const { setRemoteJobData } = remoteJobDataSlice.actions;

export default remoteJobDataSlice.reducer;