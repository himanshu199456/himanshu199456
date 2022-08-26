import axios from '../axios';
import Config from 'react-native-config';

export const endpoints = {
    getMasterData: 'master-data',
    city: 'getCity',
    getCourt: 'getCourt',
    saveTicket: 'saveCaseTicket',
    getEditDetail: 'editCaseTicketDetailById/',
    getSubMember:'getSubMember'
};

export default {
    getMasterDataDetail: () => {
        return axios.get(endpoints.getMasterData)
    },
    getCity: (data) => {
        return axios.post(endpoints.city, data)
    },
    getCourt: (data) => {
        return axios.post(endpoints.getCourt, data)
    },
    saveTicket: (data) => {
        return axios.post(endpoints.saveTicket, data)
    },
    getEditDetail: (id) => {
        return axios.get(endpoints.getEditDetail + id)
    },
    getSubMember: (id) => {
        return axios.get(endpoints.getSubMember)
    },
};
