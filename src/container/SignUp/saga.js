/**
 *
 * RegisterScreen saga
 *
 */

import * as api from '../../api';
import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
import { SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from './actions';
import AsyncStorage from '@react-native-community/async-storage';
import { LOGIN_SUCCESS } from '../Login/actions';


async function storeUserData(userData) {
    try {
        await AsyncStorage.setItem('token', JSON.stringify(userData));
    } catch (error) {
        console.log('AsyncStorage error during token store:', error);
    }
}

export function* registerUser({ payload }) {
    console.log(" payload ", payload);
    try {
        const userDetails = yield call(api.register.userRegister, payload);
        console.log(" USER DETAIL ", userDetails);
        if (userDetails.token) {
            yield call(storeUserData, userDetails);
            yield put({ type: SIGNUP_SUCCESS, userDetails });
            yield put({ type: LOGIN_SUCCESS, userDetails });
        } else {
            yield put({ type: SIGNUP_FAILURE, error: userDetails });
        }

    } catch (error) {
        console.log(" error ", error);
        yield put({ type: SIGNUP_FAILURE, error });
    }
}

export default function* registerScreenSaga() {
    console.log(" registerScreenSaga ");
    yield takeLatest(SIGNUP_REQUEST, registerUser);
}