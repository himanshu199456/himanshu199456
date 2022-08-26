/**
 *
 * Ticket reducer
 *
 */

import { EDIT_PROFILE_FAILURE, EDIT_PROFILE_REQUEST, EDIT_PROFILE_RESET_ERROR, EDIT_PROFILE_SUCCESS } from "./actions";


const initialState = {
    loading: false,
    userDetail: null,
    error: null,
};

export const EditProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case EDIT_PROFILE_SUCCESS:
            return {
                ...state,
                userDetail: action.data,
                loading: false,
            };

        case EDIT_PROFILE_FAILURE:
            console.log(" ACTION ", action.error);
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case EDIT_PROFILE_RESET_ERROR:
            return {
                ...state,
                loading: false,
                userDetail: null,
                error: null,
            };

        default:
            return state;
    }
};

export default EditProfileReducer;