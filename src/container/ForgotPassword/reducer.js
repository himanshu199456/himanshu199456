/**
 *
 * ForgotPassword reducer
 *
 */

import { FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_RESET_ERROR, FORGOT_PASSWORD_SUCCESS } from "./action";


const initialState = {
    loading: false,
    success: null,
    error: null
};

export const ForgotPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case FORGOT_PASSWORD_SUCCESS:
            console.log(" CHECK DATA ", action.data);
            return {
                ...state,
                success: action.data,
                loading: false,
            };

        case FORGOT_PASSWORD_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case FORGOT_PASSWORD_RESET_ERROR:
            return {
                ...state,
                error: null,
                success: null,
                loading: false,
            };
        default:
            return state;
    }
};

export default ForgotPasswordReducer;