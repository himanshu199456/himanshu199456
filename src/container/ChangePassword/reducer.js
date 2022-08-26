/**
 *
 * ChangePassword reducer
 *
 */

import { CHANGE_FORGOT_PASSWORD_FAILURE, CHANGE_FORGOT_PASSWORD_REQUEST, CHANGE_FORGOT_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_RESET_ERROR, CHANGE_PASSWORD_SUCCESS, GET_OTP_FAILURE, GET_OTP_REQUEST, GET_OTP_SUCCESS } from "./action";




const initialState = {
    loading: false,
    success: null,
    resetSuccessfully: null,
    forgotSuccessfully: null,
    error: null,
};

export const ChangePasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case CHANGE_PASSWORD_SUCCESS:
            console.log(" CHECK DATA ", action.data);
            return {
                ...state,
                resetSuccessfully: action.data,
                loading: false,
            };

        case CHANGE_PASSWORD_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case CHANGE_PASSWORD_RESET_ERROR:
            return {
                ...state,
                loading: false,
                success: null,
                resetSuccessfully: null,
                forgotSuccessfully:null,
                error: null,
            };
        case GET_OTP_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case GET_OTP_SUCCESS:
            console.log(" CHECK DATA 123", action.data);
            return {
                ...state,
                success: action.data,
                loading: false,
            };

        case GET_OTP_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case CHANGE_FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case CHANGE_FORGOT_PASSWORD_SUCCESS:
            console.log(" CHECK DATA ", action.data);
            return {
                ...state,
                forgotSuccessfully: action.data,
                loading: false,
            };
        case CHANGE_FORGOT_PASSWORD_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        default:
            return state;
    }
};

export default ChangePasswordReducer;