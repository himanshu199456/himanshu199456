import axios from '../axios';

export const endpoints = {
    subscriptionList: 'subscriptionlist',
    proccessPayment: 'proceedToPay',
    applyCoupon: 'applyCoupon'
};

export default {
    getSubscription: () => {
        return axios.get(endpoints.subscriptionList)
    },
    getPaymentToken: (data) => {
        return axios.post(endpoints.proccessPayment, data)
    },
    applyCoupon: (data) => {
        return axios.post(endpoints.applyCoupon, data)
    }
};