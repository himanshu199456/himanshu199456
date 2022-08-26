import axios from '../axios';

export const endpoints = {
    editProfile: 'update-profile'
};

export default {
    updateProfile: (data) => {
        console.log(" DATA CHECK updateProfile ", data);
        return axios.post(endpoints.editProfile, data)
    }
};