
import axios from '../axios';

export const endpoints = {
    viewTicket: 'getCaseTicketList'
};

export default {
    viewCaseTicket: () => {
        return axios.get(endpoints.viewTicket)
    }
};