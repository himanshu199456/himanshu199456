import axios from '../axios';

export const endpoints = {
    verify_otp: 'verifyOtp'
};

export default {
    verifyUserOTP: (data) => {
        console.log(" DATA CHECK ", data);
        // console.log(" DATA CHECK 111", axios.post(endpoints.login, data));
        return axios.post(endpoints.verify_otp, data)
    }
};