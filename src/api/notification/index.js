
import axios from '../axios';
import Config from 'react-native-config';

export const endpoints = {
    notification: 'getAllNotification'
};

export default {
    getNotification: () => {
        return axios.get(endpoints.notification)
    }
};
