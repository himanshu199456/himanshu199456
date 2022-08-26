import axios from '../axios';

export const endpoints = {
    register: 'registration'
};

export default {
    userRegister: (data) => {
        console.log(" DATA CHECK REGISTER ", data);
        // console.log(" DATA CHECK 111", axios.post(endpoints.login, data));
        return axios.post(endpoints.register, data)
    }
};