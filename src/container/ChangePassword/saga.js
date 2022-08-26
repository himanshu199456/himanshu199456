/**
 *
 * ChangePassword saga
 *
 */

import * as api from '../../api';
import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
import { CHANGE_FORGOT_PASSWORD_FAILURE, CHANGE_FORGOT_PASSWORD_REQUEST, CHANGE_FORGOT_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, GET_OTP_FAILURE, GET_OTP_REQUEST, GET_OTP_SUCCESS } from './action';


export function* changePasswordUser({ payload }) {
    console.log(" payload ", payload);
    try {
        const data = yield call(api.changePassword.userChangePassword, payload);
        console.log(" USER DETAIL ", data);
        yield put({ type: CHANGE_PASSWORD_SUCCESS, data });

    } catch (error) {
        console.log(" error ", error);
        yield put({ type: CHANGE_PASSWORD_FAILURE, error });
    }
}

export function* forgotPassword({ payload }) {
    console.log(" payload ", payload);
    try {
        const data = yield call(api.changePassword.userForgotPassword, payload);
        console.log(" USER DETAIL ", data);
        yield put({ type: CHANGE_FORGOT_PASSWORD_SUCCESS, data });

    } catch (error) {
        console.log(" error ", error);
        yield put({ type: CHANGE_FORGOT_PASSWORD_FAILURE, error });
    }
}

export function* getOTPAction({ payload }) {
    console.log(" payload ", payload);
    try {
        const data = yield call(api.changePassword.getOTPCode, payload);
        console.log(" USER DETAIL ", data);
        yield put({ type: GET_OTP_SUCCESS, data });

    } catch (error) {
        console.log(" error ", error);
        yield put({ type: GET_OTP_FAILURE, error });
    }
}

export default function* changePasswordSaga() {
    console.log(" changePasswordSaga ");
    yield takeLatest(CHANGE_PASSWORD_REQUEST, changePasswordUser);
    yield takeLatest(CHANGE_FORGOT_PASSWORD_REQUEST, forgotPassword);
    yield takeLatest(GET_OTP_REQUEST, getOTPAction);
}