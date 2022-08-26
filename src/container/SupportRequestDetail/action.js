/**
 *
 * Support Request Detail actions
 *
 */

export const SUPPORT_DETAIL_REQUEST = 'SUPPORT_DETAIL_REQUEST';
export const SUPPORT_DETAIL_SUCCESS = 'SUPPORT_DETAIL_SUCCESS';
export const SUPPORT_DETAIL_FAILURE = 'SUPPORT_DETAIL_FAILURE';
export const SUPPORT_DETAIL_RESET_ERROR = 'SUPPORT_DETAIL_RESET_ERROR';

export const SUPPORT_REPLY_REQUEST = 'SUPPORT_REPLY_REQUEST';
export const SUPPORT_REPLY_SUCCESS = 'SUPPORT_REPLY_SUCCESS';
export const SUPPORT_REPLY_FAILURE = 'SUPPORT_REPLY_FAILURE';

export const getSupportRequestDetail = (data) => {
    console.log(" data ", data);
    return {
        type: SUPPORT_DETAIL_REQUEST,
        payload: data,
    }
};

export const saveSupportReply = (data) => {
    console.log(" data ", data);
    return {
        type: SUPPORT_REPLY_REQUEST,
        payload: data,
    }
};

export function resetError() {
    return {
        type: SUPPORT_DETAIL_RESET_ERROR,
        payload: true,
    };
}