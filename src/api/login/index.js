import axios from '../axios';
import Config from 'react-native-config';

export const endpoints = {
    login: 'login'
};

export default {
    userLogin: (data) => {
        console.log(" DATA CHECK ", data);
        // console.log(" DATA CHECK 111", axios.post(endpoints.login, data));
        return axios.post(endpoints.login, data)
    }
};