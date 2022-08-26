/**
 *
 * View Ticket actions
 *
 */

export const VIEW_TICKET_REQUEST = 'VIEW_TICKET_REQUEST';
export const VIEW_TICKET_SUCCESS = 'VIEW_TICKET_SUCCESS';
export const VIEW_TICKET_FAILURE = 'VIEW_TICKET_FAILURE';
export const VIEW_TICKET_RESET_ERROR = 'VIEW_TICKET_RESET_ERROR';

export const getViewTicket = (data) => {
    console.log(" data ", data);
    return {
        type: VIEW_TICKET_REQUEST,
        payload: data,
    }
};

export function resetError() {
    return {
        type: VIEW_TICKET_RESET_ERROR,
        payload: true,
    };
}