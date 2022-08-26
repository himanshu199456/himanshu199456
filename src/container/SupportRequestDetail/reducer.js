/**
 *
 * Support Request reducer
 *
 */

import { SUPPORT_DETAIL_FAILURE, SUPPORT_DETAIL_REQUEST, SUPPORT_DETAIL_RESET_ERROR, SUPPORT_DETAIL_SUCCESS, SUPPORT_REPLY_FAILURE, SUPPORT_REPLY_REQUEST, SUPPORT_REPLY_SUCCESS } from "./action";




const initialState = {
    loading: false,
    supportRequestDetail: null,
    saveReplySuccess: null,
    error: null
};

export const SupportDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUPPORT_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case SUPPORT_DETAIL_SUCCESS:
            return {
                ...state,
                supportRequestDetail: action.data,
                loading: false,
            };

        case SUPPORT_DETAIL_FAILURE:
            console.log(" ACTION ", action.error);
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case SUPPORT_DETAIL_RESET_ERROR:
            return {
                ...state,
                error: null,
                loading: false,
            };
        case SUPPORT_REPLY_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case SUPPORT_REPLY_SUCCESS:
            return {
                ...state,
                saveReplySuccess: action.data,
                loading: false,
            };

        case SUPPORT_REPLY_FAILURE:
            console.log(" ACTION ", action.error);
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        default:
            return state;
    }
};

export default SupportDetailReducer;