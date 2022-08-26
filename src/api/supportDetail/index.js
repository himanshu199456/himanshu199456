import axios from '../axios';

export const endpoints = {
    supportDetail: 'getSupportTicketDetails/',
    saveReply: 'saveSupportTicketReply'
};

export default {
    supportDetail: (id) => {
        return axios.get(endpoints.supportDetail + id)
    },
    saveDetail: (data) => {
        return axios.post(endpoints.saveReply, data)
    }
};