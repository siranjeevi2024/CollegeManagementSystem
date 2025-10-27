import axios from 'axios';
import {
    getTimetablesStart,
    getTimetablesSuccess,
    getTimetablesFailure,
    generateTimetableStart,
    generateTimetableSuccess,
    generateTimetableFailure,
    createTimetableStart,
    createTimetableSuccess,
    createTimetableFailure
} from './timetableSlice';

export const getTimetables = (id, classId = "", teacherId = "") => async (dispatch) => {
    dispatch(getTimetablesStart());
    try {
        const queryParams = [];
        if (classId) queryParams.push(`classId=${classId}`);
        if (teacherId) queryParams.push(`teacherId=${teacherId}`);
        const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/Timetables/${id}${queryString}`);
        dispatch(getTimetablesSuccess(response.data));
    } catch (error) {
        dispatch(getTimetablesFailure(error.message));
    }
};

export const createTimetable = (data) => async (dispatch) => {
    dispatch(createTimetableStart());
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/TimetableCreate`, data);
        dispatch(createTimetableSuccess(response.data));
    } catch (error) {
        dispatch(createTimetableFailure(error.message));
    }
};

export const generateTimetable = (id) => async (dispatch) => {
    dispatch(generateTimetableStart());
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/GenerateTimetable/${id}`);
        dispatch(generateTimetableSuccess(response.data.message));
    } catch (error) {
        dispatch(generateTimetableFailure(error.message));
    }
};
