/**
 *
 * View Ticket saga
 *
 */

import * as api from '../../api';
import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
import { CANCEL_SUBSCRIPTION_FAILURE, CANCEL_SUBSCRIPTION_REQUEST, CANCEL_SUBSCRIPTION_SUCCESS, PAYMENT_HISTORY_FAILURE, PAYMENT_HISTORY_REQUEST, PAYMENT_HISTORY_SUCCESS } from './actions';
import AsyncStorage from '@react-native-community/async-storage';


export function* getPaymentHistoryList({ payload }) {
    console.log(" payload ", payload);
    try {
        const data = yield call(api.paymentHistory.getPaymentList, payload);
        console.log(" VIEW TICKET ", data);
        yield put({ type: PAYMENT_HISTORY_SUCCESS, data: data[0] });
    } catch (error) {
        console.log(" error ", error);
        yield put({ type: PAYMENT_HISTORY_FAILURE, error: error });
    }
}

async function storeUserData(userData) {
    try {
        await AsyncStorage.setItem('token', JSON.stringify(userData));
    } catch (error) {
        console.log('AsyncStorage error during token store:', error);
    }
}

export function* cancelSubscription({ payload }) {
    console.log(" payload ", payload);
    try {
        const data = yield call(api.paymentHistory.cancelSubscription, payload);
        console.log(" cancelSubscription ", data);
        yield call(storeUserData, data);
        yield put({ type: CANCEL_SUBSCRIPTION_SUCCESS, data });
    } catch (error) {
        console.log(" error ", error);
        yield put({ type: CANCEL_SUBSCRIPTION_FAILURE, error: error });
    }
}

export default function* paymentHistoryScreenSaga() {
    console.log(" paymentHistoryScreenSaga ");
    yield takeLatest(PAYMENT_HISTORY_REQUEST, getPaymentHistoryList);
    yield takeLatest(CANCEL_SUBSCRIPTION_REQUEST, cancelSubscription);
}