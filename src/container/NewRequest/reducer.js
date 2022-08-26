/**
 *
 * LoginScreen reducer
 *
 */

import { NEW_REQUEST_FAILURE, NEW_REQUEST_REQUEST, NEW_REQUEST_RESET_ERROR, NEW_REQUEST_SUCCESS } from "./actions";



const initialState = {
    loading: false,
    success: null,
    error: null
};

export const NewRequestReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_REQUEST_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case NEW_REQUEST_SUCCESS:
            return {
                ...state,
                success: action.data,
                loading: false,
            };

        case NEW_REQUEST_FAILURE:
            console.log(" ACTION ", action.error);
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case NEW_REQUEST_RESET_ERROR:
            return {
                ...state,
                error: null,
                loading: false,
            };
        default:
            return state;
    }
};

export default NewRequestReducer;