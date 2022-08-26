/**
 *
 * SupportRequest saga
 *
 */

import * as api from '../../api';
import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
import { SUPPORT_FAILURE, SUPPORT_REQUEST, SUPPORT_SUCCESS } from './action';


export function* getSupportRequestList({ payload }) {
    console.log(" payload ", payload);
    try {
        const data = yield call(api.supportRequest.supportRequest, payload);
        console.log(" USER DETAIL ", data);
        yield put({ type: SUPPORT_SUCCESS, data });
    } catch (error) {
        console.log(" error ", error);
        yield put({ type: SUPPORT_FAILURE, error});
    }
}

export default function* supportRequestScreenSaga() {
    console.log(" supportRequestScreenSaga ");
    yield takeLatest(SUPPORT_REQUEST, getSupportRequestList);
}