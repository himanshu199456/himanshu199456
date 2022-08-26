import axios from '../axios';

export const endpoints = {
    chatList: 'getChatList',
    saveMessage: 'saveChat'
};

export default {
    getChatList: () => {
        return axios.get(endpoints.chatList)
    },
    saveChatMessage: (data) => {
        return axios.post(endpoints.saveMessage,data)
    }
};