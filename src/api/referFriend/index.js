import axios from '../axios';

export const endpoints = {
    referFriend: 'referUser'
};

export default {
    referFriend: (data) => {
        return axios.post(endpoints.referFriend, data)
    }
};