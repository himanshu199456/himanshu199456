/**
 *
 * Ticket reducer
 *
 */

import { EDIT_DETAIL_TICKET_FAILURE, EDIT_DETAIL_TICKET_REQUEST, EDIT_DETAIL_TICKET_SUCCESS, GET_CITY_BY_STATE_FAILURE, GET_CITY_BY_STATE_REQUEST, GET_CITY_BY_STATE_SUCCESS, GET_COURT_BY_CITY_FAILURE, GET_COURT_BY_CITY_REQUEST, GET_COURT_BY_CITY_SUCCESS, GET_MASTER_DATA_FAILURE, GET_MASTER_DATA_REQUEST, GET_MASTER_DATA_RESET_ERROR, GET_MASTER_DATA_SUCCESS, GET_SUB_MEMBER_FAILURE, GET_SUB_MEMBER_REQUEST, GET_SUB_MEMBER_SUCCESS, SAVE_TICKET_FAILURE, SAVE_TICKET_REQUEST, SAVE_TICKET_SUCCESS } from "./actions";

const initialState = {
    loading: false,
    masterData: null,
    error: null,
    city: null,
    court: null,
    saveSuccess: null,
    ticketDetail: null,
    subMemberList: null
};

export const TicketReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MASTER_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case GET_MASTER_DATA_SUCCESS:
            return {
                ...state,
                masterData: action.data,
                loading: false,
            };

        case GET_MASTER_DATA_FAILURE:
            console.log(" ACTION ", action.error);
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case GET_MASTER_DATA_RESET_ERROR:
            return {
                ...state,
                loading: false,
                error: null,
                saveSuccess: null,
                ticketDetail: null,
            };
        case GET_CITY_BY_STATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_CITY_BY_STATE_SUCCESS:
            return {
                ...state,
                city: action.data,
                loading: false,
            }
        case GET_CITY_BY_STATE_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            }
        case GET_COURT_BY_CITY_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_COURT_BY_CITY_SUCCESS:
            return {
                ...state,
                court: action.data,
                loading: false,
            }
        case GET_COURT_BY_CITY_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            }
        case SAVE_TICKET_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case SAVE_TICKET_SUCCESS:
            return {
                ...state,
                saveSuccess: action.data,
                loading: false,
            }
        case SAVE_TICKET_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            }
        case EDIT_DETAIL_TICKET_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case EDIT_DETAIL_TICKET_SUCCESS:
            return {
                ...state,
                ticketDetail: action.data,
                loading: false,
            }
        case EDIT_DETAIL_TICKET_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            }
        case GET_SUB_MEMBER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_SUB_MEMBER_SUCCESS:
            return {
                ...state,
                subMemberList: action.data,
                loading: false,
            }
        case GET_SUB_MEMBER_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            }
        default:
            return state;
    }
};

export default TicketReducer;