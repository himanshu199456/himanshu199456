/**
 *
 * Chat actions
 *
 */

export const REFER_REQUEST = 'REFER_REQUEST';
export const REFER_SUCCESS = 'REFER_SUCCESS';
export const REFER_FAILURE = 'REFER_FAILURE';


export const REFER_RESET_ERROR = 'REFER_RESET_ERROR';

export const referFriend = (user) => {
    console.log(" user ", user);
    return {
        type: REFER_REQUEST,
        payload: user,
    }
};



export function resetError() {
    return {
        type: REFER_RESET_ERROR,
        payload: true,
    };
}