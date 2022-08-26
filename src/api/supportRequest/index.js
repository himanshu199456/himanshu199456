import axios from '../axios';

export const endpoints = {
    supportRequest: 'getSupportTicketList'
};

export default {
    supportRequest: () => {
        return axios.get(endpoints.supportRequest)
    }
};