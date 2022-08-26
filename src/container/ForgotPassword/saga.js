
import * as api from '../../api';
import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
import { FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS } from './action';


export function* forgotPasswordUser({ payload }) {
    console.log(" payload ", payload);
    try {
        const data = yield call(api.forgotPassword.userForgotPassword, payload);
        console.log(" USER DETAIL ", data);
        yield put({ type: FORGOT_PASSWORD_SUCCESS, data });

    } catch (error) {
        console.log(" error ", error);
        yield put({ type: FORGOT_PASSWORD_FAILURE, error });
    }
}

export default function* forgotPasswordSaga() {
    console.log(" forgotPasswordSaga ");
    yield takeLatest(FORGOT_PASSWORD_REQUEST, forgotPasswordUser);
}