import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    assignments: [],
    assignmentDetails: null,
    loading: false,
    error: null,
};

const assignmentSlice = createSlice({
    name: 'assignment',
    initialState,
    reducers: {
        getAssignmentsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getAssignmentsSuccess: (state, action) => {
            state.assignments = action.payload;
            state.loading = false;
        },
        getAssignmentsFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        getAssignmentDetailsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getAssignmentDetailsSuccess: (state, action) => {
            state.assignmentDetails = action.payload;
            state.loading = false;
        },
        getAssignmentDetailsFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        createAssignmentStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        createAssignmentSuccess: (state, action) => {
            state.assignments.push(action.payload);
            state.loading = false;
            state.error = null;
        },
        createAssignmentFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        submitAssignmentStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        submitAssignmentSuccess: (state) => {
            state.loading = false;
        },
        submitAssignmentFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        gradeAssignmentStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        gradeAssignmentSuccess: (state) => {
            state.loading = false;
        },
        gradeAssignmentFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteAssignmentStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteAssignmentSuccess: (state, action) => {
            state.assignments = state.assignments.filter(assignment => assignment._id !== action.payload);
            state.loading = false;
        },
        deleteAssignmentFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    getAssignmentsStart,
    getAssignmentsSuccess,
    getAssignmentsFailure,
    getAssignmentDetailsStart,
    getAssignmentDetailsSuccess,
    getAssignmentDetailsFailure,
    createAssignmentStart,
    createAssignmentSuccess,
    createAssignmentFailure,
    submitAssignmentStart,
    submitAssignmentSuccess,
    submitAssignmentFailure,
    gradeAssignmentStart,
    gradeAssignmentSuccess,
    gradeAssignmentFailure,
    deleteAssignmentStart,
    deleteAssignmentSuccess,
    deleteAssignmentFailure,
} = assignmentSlice.actions;

export default assignmentSlice.reducer;
