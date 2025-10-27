import axios from 'axios';
import {
    getExamTimetablesStart,
    getExamTimetablesSuccess,
    getExamTimetablesFailure,
    createExamTimetableStart,
    createExamTimetableSuccess,
    createExamTimetableFailure,
    deleteExamTimetableStart,
    deleteExamTimetableSuccess,
    deleteExamTimetableFailure
} from './examTimetableSlice';

export const getExamTimetables = (id, classId = "", semester = "") => async (dispatch) => {
    dispatch(getExamTimetablesStart());
    try {
        const queryParams = [];
        if (classId) queryParams.push(`classId=${classId}`);
        if (semester) queryParams.push(`semester=${semester}`);
        const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/ExamTimetables/${id}${queryString}`);
        dispatch(getExamTimetablesSuccess(response.data));
    } catch (error) {
        dispatch(getExamTimetablesFailure(error.message));
    }
};

export const createExamTimetable = (data) => async (dispatch) => {
    dispatch(createExamTimetableStart());
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/ExamTimetableCreate`, data);
        dispatch(createExamTimetableSuccess(response.data));
    } catch (error) {
        dispatch(createExamTimetableFailure(error.message));
    }
};

export const deleteExamTimetable = (id) => async (dispatch) => {
    dispatch(deleteExamTimetableStart());
    try {
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/ExamTimetable/${id}`);
        dispatch(deleteExamTimetableSuccess(id));
    } catch (error) {
        dispatch(deleteExamTimetableFailure(error.message));
    }
};
