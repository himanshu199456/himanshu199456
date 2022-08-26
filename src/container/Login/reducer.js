/**
 *
 * LoginScreen reducer
 *
 */

import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, RESET_ERROR } from "./actions";



const initialState = {
    loading: false,
    user: null,
    error: null
};

export const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.userDetails,
                loading: false,
            };

        case LOGIN_FAILURE:
            console.log(" ACTION ", action.error);
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case RESET_ERROR:
            return {
                ...state,
                error: null,
                loading: false,
            };
        default:
            return state;
    }
};

export default LoginReducer;