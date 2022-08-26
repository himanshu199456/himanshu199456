import axios from '../axios';

export const endpoints = {
    addMember: "addSubMember",
};

export default {
    addMember: (data) => {
        return axios.post(endpoints.addMember, data)
    }
};