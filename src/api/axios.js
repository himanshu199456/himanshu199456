import configInterceptors from './interceptor';
import rootAxios from 'axios';
import Qs from 'qs';
import Config from 'react-native-config';
import { Strings } from '../utils/string';

const createAxiosInstance = () => {
    console.log(" Config.API_URL ", Config.API_URL);
    return rootAxios.create({
        baseURL: Strings.BASE_URL,
        paramsSerializer: params =>
            Qs.stringify(params, { arrayFormat: 'brackets' }),
    });
}

const axios = createAxiosInstance();

configInterceptors(axios);

export default axios;