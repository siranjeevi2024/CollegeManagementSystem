import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    examTimetables: [],
    status: 'idle',
    error: null
};

const examTimetableSlice = createSlice({
    name: 'examTimetable',
    initialState,
    reducers: {
        getExamTimetablesStart: (state) => {
            state.status = 'loading';
        },
        getExamTimetablesSuccess: (state, action) => {
            state.status = 'succeeded';
            state.examTimetables = action.payload;
        },
        getExamTimetablesFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        createExamTimetableStart: (state) => {
            state.status = 'loading';
        },
        createExamTimetableSuccess: (state, action) => {
            state.status = 'succeeded';
            state.examTimetables.push(action.payload);
        },
        createExamTimetableFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        deleteExamTimetableStart: (state) => {
            state.status = 'loading';
        },
        deleteExamTimetableSuccess: (state, action) => {
            state.status = 'succeeded';
            state.examTimetables = state.examTimetables.filter(
                timetable => timetable._id !== action.payload
            );
        },
        deleteExamTimetableFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
});

export const {
    getExamTimetablesStart,
    getExamTimetablesSuccess,
    getExamTimetablesFailure,
    createExamTimetableStart,
    createExamTimetableSuccess,
    createExamTimetableFailure,
    deleteExamTimetableStart,
    deleteExamTimetableSuccess,
    deleteExamTimetableFailure
} = examTimetableSlice.actions;

export default examTimetableSlice.reducer;
