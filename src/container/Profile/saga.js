/**
 *
 * Edit profile saga
 *
 */

import * as api from '../../api';
import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
import { EDIT_PROFILE_FAILURE, EDIT_PROFILE_REQUEST, EDIT_PROFILE_SUCCESS } from './actions';
import AsyncStorage from '@react-native-community/async-storage';

async function storeUserData(userData) {
    userData['user_subscription'] = true
    userData['user_subscription_valid'] = true
    try {
        await AsyncStorage.setItem('token', JSON.stringify(userData));
    } catch (error) {
        console.log('AsyncStorage error during token store:', error);
    }
}

export function* updateUserProfile({ payload }) {
    console.log(" payload ", payload);
    try {
        const data = yield call(api.editProfile.updateProfile, payload);
        console.log(" DATA ", data);
        yield call(storeUserData, data);
        yield put({ type: EDIT_PROFILE_SUCCESS, data });
    } catch (error) {
        console.log(" error ", error);
        yield put({ type: EDIT_PROFILE_FAILURE, error });
    }
}


export default function* editProfileScreenSaga() {
    console.log(" editProfileScreenSaga ");
    yield takeLatest(EDIT_PROFILE_REQUEST, updateUserProfile);
}