
import axios from '../axios';

export const endpoints = {
    terms: 'getInformationPageDetail/terms-conditions'
};

export default {
    getTermsData: () => {
        return axios.get(endpoints.terms)
    }
};