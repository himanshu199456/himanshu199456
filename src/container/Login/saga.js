/**
 *
 * LoginScreen saga
 *
 */

import * as api from '../../api';
import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from './actions';
import { saveData } from '../../utils/AsyncStorageHelper';
import AsyncStorage from '@react-native-community/async-storage';

async function storeUserData(userData) {
    try {
        await AsyncStorage.setItem('token', JSON.stringify(userData));
    } catch (error) {
        console.log('AsyncStorage error during token store:', error);
    }
}

export function* authenticateUser({ payload }) {
    console.log(" payload ", payload);
    try {
        const userDetails = yield call(api.login.userLogin, payload);
        console.log(" USER DETAIL ", userDetails);
        if (userDetails.token) {
            yield call(storeUserData, userDetails);
            yield put({ type: LOGIN_SUCCESS, userDetails });
        } else {
            yield put({ type: LOGIN_FAILURE, error: userDetails });
        }

    } catch (error) {
        console.log(" error ", error);
        yield put({ type: LOGIN_FAILURE, error });
    }
}

export default function* loginScreenSaga() {
    console.log(" loginScreenSaga ");
    yield takeLatest(LOGIN_REQUEST, authenticateUser);
}