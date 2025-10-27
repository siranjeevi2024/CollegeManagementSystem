import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    eventsList: [],
    loading: false,
    error: null,
    response: null,
    status: null,
};

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getSuccess: (state, action) => {
            state.eventsList = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
            state.status = null;
        },
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
            state.status = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = null;
        },
        resetStatus: (state) => {
            state.status = null;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        getDeleteSuccess: (state) => {
            state.loading = false;
            state.error = null;
            state.response = null;
            state.status = 'deleted';
        }
    },
});

export const {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    resetStatus,
    setStatus,
    getDeleteSuccess
} = eventSlice.actions;

export const eventReducer = eventSlice.reducer;
