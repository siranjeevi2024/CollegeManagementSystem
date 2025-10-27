import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    timetables: [],
    loading: false,
    error: null,
    message: null,
    status: null
};

const timetableSlice = createSlice({
    name: 'timetable',
    initialState,
    reducers: {
        getTimetablesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getTimetablesSuccess: (state, action) => {
            state.loading = false;
            state.timetables = action.payload;
        },
        getTimetablesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        generateTimetableStart: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        generateTimetableSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        generateTimetableFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        createTimetableStart: (state) => {
            state.loading = true;
            state.error = null;
            state.status = null;
        },
        createTimetableSuccess: (state, action) => {
            state.loading = false;
            state.status = 'success';
        },
        createTimetableFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = 'error';
        }
    }
});

export const {
    getTimetablesStart,
    getTimetablesSuccess,
    getTimetablesFailure,
    generateTimetableStart,
    generateTimetableSuccess,
    generateTimetableFailure,
    createTimetableStart,
    createTimetableSuccess,
    createTimetableFailure
} = timetableSlice.actions;

export default timetableSlice.reducer;
