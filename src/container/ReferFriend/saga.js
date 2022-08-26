/**
 *
 * ChatScreen saga
 *
 */

import * as api from '../../api';
import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
import { REFER_FAILURE, REFER_REQUEST, REFER_SUCCESS } from './actions';

export function* referFriend({ payload }) {
    console.log(" payload ", payload);
    try {
        const data = yield call(api.referFriend.referFriend, payload);
        console.log(" USER DETAIL ", data);
        yield put({ type: REFER_SUCCESS, data });

    } catch (error) {
        console.log(" error ", error);
        yield put({ type: REFER_FAILURE, error });
    }
}



export default function* referScreenSaga() {
    console.log(" chatScreenSaga ");
    yield takeLatest(REFER_REQUEST, referFriend);
}