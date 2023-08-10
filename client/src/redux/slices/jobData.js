// redux/jobData.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    jobData: {},
};

export const jobDataSlice = createSlice({
    name: 'jobData',
    initialState,
    reducers: {
        setJobData: (state, action) => {
            state.jobData = action.payload;
        },
    },
});

export const { setJobData } = jobDataSlice.actions;

export default jobDataSlice.reducer;