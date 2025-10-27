import axios from 'axios';
import {
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
} from './assignmentSlice';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

// Get assignments for teacher
export const getAssignmentsByTeacher = (teacherId) => async (dispatch) => {
    dispatch(getAssignmentsStart());
    try {
        const response = await axios.get(`${BASE_URL}/AssignmentsTeacher/${teacherId}`);
        dispatch(getAssignmentsSuccess(response.data));
    } catch (error) {
        dispatch(getAssignmentsFailure(error.response?.data?.message || 'Failed to fetch assignments'));
    }
};

// Get assignments for student
export const getAssignmentsByStudent = (studentId) => async (dispatch) => {
    dispatch(getAssignmentsStart());
    try {
        const response = await axios.get(`${BASE_URL}/AssignmentsStudent/${studentId}`);
        dispatch(getAssignmentsSuccess(response.data));
    } catch (error) {
        dispatch(getAssignmentsFailure(error.response?.data?.message || 'Failed to fetch assignments'));
    }
};

// Get assignment details
export const getAssignmentDetails = (assignmentId) => async (dispatch) => {
    dispatch(getAssignmentDetailsStart());
    try {
        const response = await axios.get(`${BASE_URL}/Assignment/${assignmentId}`);
        dispatch(getAssignmentDetailsSuccess(response.data));
    } catch (error) {
        dispatch(getAssignmentDetailsFailure(error.response?.data?.message || 'Failed to fetch assignment details'));
    }
};

// Create assignment
export const createAssignment = (assignmentData) => async (dispatch) => {
    dispatch(createAssignmentStart());
    try {
        const response = await axios.post(`${BASE_URL}/AssignmentCreate`, assignmentData);
        dispatch(createAssignmentSuccess(response.data));
        return response.data; // Return the created assignment
    } catch (error) {
        dispatch(createAssignmentFailure(error.response?.data?.message || 'Failed to create assignment'));
        throw error; // Re-throw to handle in component
    }
};

// Submit assignment
export const submitAssignment = (submissionData) => async (dispatch) => {
    dispatch(submitAssignmentStart());
    try {
        await axios.post(`${BASE_URL}/SubmitAssignment`, submissionData);
        dispatch(submitAssignmentSuccess());
    } catch (error) {
        dispatch(submitAssignmentFailure(error.response?.data?.message || 'Failed to submit assignment'));
    }
};

// Grade assignment
export const gradeAssignment = (gradeData) => async (dispatch) => {
    dispatch(gradeAssignmentStart());
    try {
        await axios.put(`${BASE_URL}/GradeAssignment`, gradeData);
        dispatch(gradeAssignmentSuccess());
    } catch (error) {
        dispatch(gradeAssignmentFailure(error.response?.data?.message || 'Failed to grade assignment'));
    }
};

// Delete assignment
export const deleteAssignment = (assignmentId) => async (dispatch) => {
    dispatch(deleteAssignmentStart());
    try {
        await axios.delete(`${BASE_URL}/Assignment/${assignmentId}`);
        dispatch(deleteAssignmentSuccess(assignmentId));
    } catch (error) {
        dispatch(deleteAssignmentFailure(error.response?.data?.message || 'Failed to delete assignment'));
    }
};
