/**
 *
 * LoginScreen saga
 *
 */

import * as api from '../../api';
import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
import { VERIFY_OTP_FAILURE, VERIFY_OTP_REQUEST, VERIFY_OTP_SUCCESS } from './actions';

export function* callOTPVerify({ payload }) {
    console.log(" payload ", payload);
    try {
        const userDetails = yield call(api.verifyOtp.verifyUserOTP, payload);
        console.log(" USER DETAIL ", userDetails);
        yield put({ type: VERIFY_OTP_SUCCESS, userDetails });
    } catch (error) {
        console.log(" error ", error);
        yield put({ type: VERIFY_OTP_FAILURE, error });
    }
}

export default function* otpVerifyScreenSaga() {
    console.log(" otpVerifyScreenSaga ");
    yield takeLatest(VERIFY_OTP_REQUEST, callOTPVerify);
}