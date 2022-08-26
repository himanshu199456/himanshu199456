/**
 *
 * NewRequest saga
 *
 */

import * as api from '../../api';
import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
import { NEW_REQUEST_FAILURE, NEW_REQUEST_REQUEST, NEW_REQUEST_SUCCESS } from './actions';



export function* saveSupportRequest({ payload }) {
    console.log(" payload ", payload);
    try {
        const data = yield call(api.newRequest.supportRequest, payload);
        console.log(" USER DETAIL ", data);
        yield put({ type: NEW_REQUEST_SUCCESS, data:true });
    } catch (error) {
        console.log(" error ", error);
        yield put({ type: NEW_REQUEST_FAILURE, error });
    }
}

export default function* newRequestScreenSaga() {
    console.log(" newRequestScreenSaga ");
    yield takeLatest(NEW_REQUEST_REQUEST, saveSupportRequest);
}