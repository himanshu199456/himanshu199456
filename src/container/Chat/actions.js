/**
 *
 * Chat actions
 *
 */

export const CHAT_LIST_REQUEST = 'CHAT_LIST_REQUEST';
export const CHAT_LIST_SUCCESS = 'CHAT_LIST_SUCCESS';
export const CHAT_LIST_FAILURE = 'CHAT_LIST_FAILURE';

export const CHAT_SAVE_MESSAGE_REQUEST = 'CHAT_SAVE_MESSAGE_REQUEST';
export const CHAT_SAVE_MESSAGE_SUCCESS = 'CHAT_SAVE_MESSAGE_SUCCESS';
export const CHAT_SAVE_MESSAGE_FAILURE = 'CHAT_SAVE_MESSAGE_FAILURE';

export const CHAT_RESET_ERROR = 'CHAT_RESET_ERROR';

export const getChatList = (user) => {
    console.log(" user ", user);
    return {
        type: CHAT_LIST_REQUEST,
        payload: user,
    }
};

export const saveChatMessage = (user) => {
    console.log(" user ", user);
    return {
        type: CHAT_SAVE_MESSAGE_REQUEST,
        payload: user,
    }
};

export function resetError() {
    return {
        type: CHAT_RESET_ERROR,
        payload: true,
    };
}