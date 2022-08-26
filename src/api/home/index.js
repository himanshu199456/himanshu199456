import axios from '../axios';

export const endpoints = {
    speedMeter: 'getCaseTicketSpeedoMeter'
};

export default {
    getSpeedoMeterData: () => {
        return axios.get(endpoints.speedMeter)
    }
};