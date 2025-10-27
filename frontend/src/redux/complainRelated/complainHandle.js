import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError
} from './complainSlice';

export const getAllComplains = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`http://localhost:5000/${address}List/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.message || 'An error occurred'));
    }
}

export const deleteComplain = (id) => async (dispatch) => {
    try {
        const result = await axios.delete(`http://localhost:5000/Complain/${id}`);
        return result.data;
    } catch (error) {
        console.error("Delete complain error:", error);
        throw error;
    }
}
