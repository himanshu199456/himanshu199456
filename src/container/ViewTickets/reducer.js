/**
 *
 * Support Request reducer
 *
 */

import { VIEW_TICKET_FAILURE, VIEW_TICKET_REQUEST, VIEW_TICKET_RESET_ERROR, VIEW_TICKET_SUCCESS } from "./action";



const initialState = {
    loading: false,
    viewTicketList: null,
    error: null
};

export const ViewTicketReducer = (state = initialState, action) => {
    switch (action.type) {
        case VIEW_TICKET_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case VIEW_TICKET_SUCCESS:
            return {
                ...state,
                viewTicketList: action.data,
                loading: false,
            };

        case VIEW_TICKET_FAILURE:
            console.log(" ACTION ", action.error);
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case VIEW_TICKET_RESET_ERROR:
            return {
                ...state,
                error: null,
                loading: false,
                viewTicketList: null
            };
        default:
            return state;
    }
};

export default ViewTicketReducer;