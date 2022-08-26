/**
 *
 * TICKET actions
 *
 */

export const GET_MASTER_DATA_REQUEST = 'GET_MASTER_DATA_REQUEST';
export const GET_MASTER_DATA_SUCCESS = 'GET_MASTER_DATA_SUCCESS';
export const GET_MASTER_DATA_FAILURE = 'GET_MASTER_DATA_FAILURE';
export const GET_MASTER_DATA_RESET_ERROR = 'GET_MASTER_DATA_RESET_ERROR';

export const GET_CITY_BY_STATE_REQUEST = 'GET_CITY_BY_STATE_REQUEST';
export const GET_CITY_BY_STATE_SUCCESS = 'GET_CITY_BY_STATE_SUCCESS';
export const GET_CITY_BY_STATE_FAILURE = 'GET_CITY_BY_STATE_FAILURE';

export const GET_COURT_BY_CITY_REQUEST = 'GET_COURT_BY_CITY_REQUEST';
export const GET_COURT_BY_CITY_SUCCESS = 'GET_COURT_BY_CITY_SUCCESS';
export const GET_COURT_BY_CITY_FAILURE = 'GET_COURT_BY_CITY_FAILURE';


export const SAVE_TICKET_REQUEST = 'SAVE_TICKET_REQUEST';
export const SAVE_TICKET_SUCCESS = 'SAVE_TICKET_SUCCESS';
export const SAVE_TICKET_FAILURE = 'SAVE_TICKET_FAILURE';

export const EDIT_DETAIL_TICKET_REQUEST = 'EDIT_DETAIL_TICKET_REQUEST';
export const EDIT_DETAIL_TICKET_SUCCESS = 'EDIT_DETAIL_TICKET_SUCCESS';
export const EDIT_DETAIL_TICKET_FAILURE = 'EDIT_DETAIL_TICKET_FAILURE';

export const GET_SUB_MEMBER_REQUEST = 'GET_SUB_MEMBER_REQUEST';
export const GET_SUB_MEMBER_SUCCESS = 'GET_SUB_MEMBER_REQUEST_SUCCESS';
export const GET_SUB_MEMBER_FAILURE = 'GET_SUB_MEMBER_REQUEST_FAILURE';

export const getMasterDetails = (user) => {
    console.log(" user ", user);
    return {
        type: GET_MASTER_DATA_REQUEST,
        payload: user,
    }
};

export const getCityByState = (user) => {
    console.log(" user ", user);
    return {
        type: GET_CITY_BY_STATE_REQUEST,
        payload: user,
    }
};

export const getCourtByCity = (user) => {
    console.log(" user ", user);
    return {
        type: GET_COURT_BY_CITY_REQUEST,
        payload: user,
    }
};

export const saveTicket = (user) => {
    console.log(" user ", user);
    return {
        type: SAVE_TICKET_REQUEST,
        payload: user,
    }
};

export const getEditTicketDetail = (user) => {
    console.log(" user ", user);
    return {
        type: EDIT_DETAIL_TICKET_REQUEST,
        payload: user,
    }
};

export const getSubMemberList = () => {
    return {
        type: GET_SUB_MEMBER_REQUEST,
        payload: true,
    }
};

export function resetError() {
    return {
        type: GET_MASTER_DATA_RESET_ERROR,
        payload: true,
    };
}
