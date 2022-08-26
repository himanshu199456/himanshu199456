import axios from '../axios';

export const endpoints = {
    payment: 'pay_via_stripe'
};

export default {
    payment: (data) => {
        return axios.post(endpoints.payment, data)
    }
};