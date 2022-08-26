import axios from '../axios';

export const endpoints = {
    forgotPassword: 'forget-password'
};

export default {
    userForgotPassword: (data) => {
        return axios.post(endpoints.forgotPassword, data)
    }
};