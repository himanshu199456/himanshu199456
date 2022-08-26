import axios from '../axios';

export const endpoints = {
    paymentList: 'getsubscribedplanlist',
    cancelSubscription:'cancel_subscription'
};

export default {
    getPaymentList: () => {
        return axios.get(endpoints.paymentList)
    },
    cancelSubscription: (data)=>{
        return axios.post(endpoints.cancelSubscription,data)
    }
};