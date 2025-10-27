import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    setStatus,
    getDeleteSuccess
} from './eventSlice';

export const getAllEvents = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}List/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const createEvent = (fields, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/${address}Create`, fields);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
            dispatch(setStatus('added'));
        }
    } catch (error) {
        dispatch(getError(error));
        dispatch(setStatus('error'));
    }
}

export const deleteEvent = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.delete(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getDeleteSuccess());
        }
    } catch (error) {
        dispatch(getError(error));
    }
}
