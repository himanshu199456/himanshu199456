/**
 *
 * RegisterScreen saga
 *
 */

import * as api from '../../api';
import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
import { APPLY_COUPON_FAILURE, APPLY_COUPON_REQUEST, APPLY_COUPON_SUCCESS, PROCEED_PAY_FAILURE, PROCEED_PAY_REQUEST, PROCEED_PAY_SUCCESS, SUBSCRIPTION_LIST_FAILURE, SUBSCRIPTION_LIST_REQUEST, SUBSCRIPTION_LIST_SUCCESS } from './actions';

export function* subscriptionList({ payload }) {
    console.log(" payload ", payload);
    try {
        const data = yield call(api.subscription.getSubscription, payload);
        console.log(" USER DETAIL ", data);
        yield put({ type: SUBSCRIPTION_LIST_SUCCESS, data });


    } catch (error) {
        console.log(" error ", error);
        yield put({ type: SUBSCRIPTION_LIST_FAILURE, error });
    }
}

export function* getPaymentDetail({ payload }) {
    console.log(" payload ", payload);
    try {
        const data = yield call(api.subscription.getPaymentToken, payload);
        console.log(" USER DETAIL ", data);
        yield put({ type: PROCEED_PAY_SUCCESS, data });
    } catch (error) {
        console.log(" error ", error);
        yield put({ type: PROCEED_PAY_FAILURE, error });
    }
}

export function* applyCoupon({ payload }) {
    console.log(" payload ", payload);
    try {
        const data = yield call(api.subscription.applyCoupon, payload);
        console.log(" USER DETAIL ", data);
        yield put({ type: APPLY_COUPON_SUCCESS, data });
    } catch (error) {
        console.log(" error ", error);
        yield put({ type: APPLY_COUPON_FAILURE, error });
    }
}

export default function* subscriptionScreenSaga() {
    console.log(" subscriptionScreenSaga ");
    yield takeLatest(SUBSCRIPTION_LIST_REQUEST, subscriptionList);
    yield takeLatest(PROCEED_PAY_REQUEST, getPaymentDetail);
    yield takeLatest(APPLY_COUPON_REQUEST, applyCoupon);
}