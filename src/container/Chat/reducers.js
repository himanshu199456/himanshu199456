/**
 *
 * ChatScreen reducer
 *
 */

import { CHAT_LIST_FAILURE, CHAT_LIST_REQUEST, CHAT_LIST_SUCCESS, CHAT_RESET_ERROR, CHAT_SAVE_MESSAGE_FAILURE, CHAT_SAVE_MESSAGE_REQUEST, CHAT_SAVE_MESSAGE_SUCCESS } from "./actions";


const initialState = {
    loading: false,
    chatList: null,
    saveMessageSuccess:null,
    error: null
};

export const ChatReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHAT_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case CHAT_LIST_SUCCESS:
            return {
                ...state,
                chatList: action.data,
                loading: false,
            };

        case CHAT_LIST_FAILURE:
            console.log(" ACTION ", action.error);
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case CHAT_RESET_ERROR:
            return {
                ...state,
                error: null,
                loading: false,
            };
        case CHAT_SAVE_MESSAGE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case CHAT_SAVE_MESSAGE_SUCCESS:
            return {
                ...state,
                saveMessageSuccess: action.data,
                loading: false,
            };

        case CHAT_SAVE_MESSAGE_FAILURE:
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

export default ChatReducer;