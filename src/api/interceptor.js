import AsyncStorage from '@react-native-community/async-storage';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useSelector } from 'react-redux';
import { logoutAction } from '../container/Login/actions';
import { store } from '../redux/store';
import NavigationService from '../utils/NavigationService';


const getUsetToken = async () => {
    return await JSON.parse(AsyncStorage.getItem('token'))
}

const setHeaders = async (config) => {
    const { headers, url } = config;
    // headers['Access-Control-Allow-Origin'] = '*';

    if (url == 'registration') {
        headers['Content-Type'] = 'multipart/form-data'
    } else {
        if (url == 'getCity' || url == 'getCourt' || url == 'saveCaseTicket' || url == 'update-profile' || url == 'saveSupportTicket' ||
            url == 'applyCoupon' || url == 'saveSupportTicketReply' || url == 'addSubMember' || url == 'cancel_subscription') {
            headers['Content-Type'] = 'multipart/form-data'
            // headers['Accept:'] = 'multipart/form-data'
        } else {
            headers['Content-Type'] = 'application/json'
        }
        console.log(" URL ", url);
        console.log(" URL 123 ", store.getState());
        // if (url == 'getSupportTicketList' || String(url).includes('getSupportTicketDetails/') || url == 'saveSupportTicketReply') {
        //     headers['Authorization'] = `Bearer 40|050Qo8XRbzyfTpIDNX6ecnzPHPSYIu85xHcnGKoM`
        // } else
        if (url == 'getInformationPageDetail/terms-conditions') {
            headers['Authorization'] = 'Bearer 104|q4FUJBaosFD4KogKIdDj2pN7ViycoK9y9PDPkXdN'
        } else if (url != 'forget-password' && url != 'login' && url != 'verifyOtp' && url != 'reset-password' && url != 'getOtp' && url != 'master-data') {
            headers['Authorization'] = `Bearer ` + store.getState().Login.user.token
        }
    }
    console.log(" CHECK CONFIG 111", headers);
    console.log(" CHECK CONFIG 222", headers['Content-Type']);
    console.log(" CHECK CONFIG ", config);
    return config;
};

const configInterceptors = (axios) => {
    axios.interceptors.request.use(async config => {
        return setHeaders(config);
    });

    // axios.interceptors.response.use(
    //     response =>
    //         // Do something with response data
    //         response,
    //     error =>
    //         // Do something with response error
    //         Promise.reject(error),
    // );
    axios.interceptors.response.use(
       async response => {
            console.log(" RESPONSE ", response);
            console.log(" RESPONSE ", response.data.success);
            console.log(" RESPONSE =====================================>>>>>>>>>>>>>>>>>>>>>>>>>>", response.data.status);
            if (response.data.status == 491) {
                console.log(" IF CONDITION ", response.data.status);
               store.dispatch(logoutAction())
                await AsyncStorage.removeItem('token')
                NavigationService.navigateAndReset('Login', {});
                return
            }
            if (response.data.success) {
                return response.data.data || response.data.message
            } else {
                return Promise.reject(response.data.message)
            }
        },
        error => {
            console.log(" API ERROR ", error);
            console.log(" API ERROR ", error.message);
            console.log(" API ERROR ", error.response.data);
            // Do something with response error
            return Promise.reject(error.response.data.message || "Something went wrong, please try again.")
        }
    );
};

export default configInterceptors;