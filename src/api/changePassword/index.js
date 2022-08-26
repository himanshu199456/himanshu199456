import axios from '../axios';

export const endpoints = {
    getOTP: "getOtp",
    changePassword: 'change-password',
    forgotPassword: 'reset-password'
};

export default {
    userChangePassword: (data) => {
        return axios.post(endpoints.changePassword, data)
    },
    userForgotPassword: (data) => {
        return axios.post(endpoints.forgotPassword, data)
    },
    getOTPCode: (data) => {
        return axios.post(endpoints.getOTP, data)
    }
};