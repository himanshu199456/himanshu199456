import axios from '../axios';

export const endpoints = {
    saveRequest: 'saveSupportTicket'
};

export default {
    supportRequest: (data) => {
        return axios.post(endpoints.saveRequest, data)
    }
};