/**
 *
 * RegisterScreen saga
 *
 */

import * as api from '../../api';
import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
import { NOTIFICATION_LIST_FAILURE, NOTIFICATION_LIST_REQUEST, NOTIFICATION_LIST_SUCCESS } from './actions';
export function* notificationList({ payload }) {
    console.log(" payload ", payload);
    try {
        const data = yield call(api.notification.getNotification, payload);
        console.log(" USER DETAIL ", data);
        yield put({ type: NOTIFICATION_LIST_SUCCESS, data });

    } catch (error) {
        console.log(" error ", error);
        yield put({ type: NOTIFICATION_LIST_FAILURE, error });
    }
}

export default function* notificationScreenSaga() {
    console.log(" notificationScreenSaga ");
    yield takeLatest(NOTIFICATION_LIST_REQUEST, notificationList);
}