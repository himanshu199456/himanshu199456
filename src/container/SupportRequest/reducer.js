/**
 *
 * Support Request reducer
 *
 */

import { SUPPORT_FAILURE, SUPPORT_REQUEST, SUPPORT_RESET_ERROR, SUPPORT_SUCCESS } from "./action";




const initialState = {
    loading: false,
    supportRequestList: null,
    error: null
};

export const SupportRequestReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUPPORT_REQUEST:
            return {
                ...state,
                loading: true,
                
            };

        case SUPPORT_SUCCESS:
            return {
                ...state,
                supportRequestList: action.data,
                loading: false,
            };

        case SUPPORT_FAILURE:
            console.log(" ACTION ", action.error);
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case SUPPORT_RESET_ERROR:
            return {
                ...state,
                error: null,
                loading: false,
            };
        default:
            return state;
    }
};

export default SupportRequestReducer;