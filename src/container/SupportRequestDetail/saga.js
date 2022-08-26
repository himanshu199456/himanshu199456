/**
 *
 * SupportRequest saga
 *
 */

 import * as api from '../../api';
 import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
 import { SUPPORT_DETAIL_FAILURE, SUPPORT_DETAIL_REQUEST, SUPPORT_DETAIL_SUCCESS, SUPPORT_REPLY_FAILURE, SUPPORT_REPLY_REQUEST, SUPPORT_REPLY_SUCCESS } from './action';
 
 
 export function* getSupportDetail({ payload }) {
     console.log(" payload ", payload);
     try {
         const data = yield call(api.supportDetail.supportDetail, payload);
         console.log(" getSupportDetail ", data);
         yield put({ type: SUPPORT_DETAIL_SUCCESS, data });
     } catch (error) {
         console.log(" error ", error);
         yield put({ type: SUPPORT_DETAIL_FAILURE, error});
     }
 }
 
 export function* saveSupportReply({ payload }) {
    console.log(" payload ", payload);
    try {
        const data = yield call(api.supportDetail.saveDetail, payload);
        console.log(" USER DETAIL ", data);
        yield put({ type: SUPPORT_REPLY_SUCCESS, data:data });
    } catch (error) {
        console.log(" error ", error);
        yield put({ type: SUPPORT_REPLY_FAILURE, error});
    }
}

 export default function* supportDetailScreenSaga() {
     console.log(" supportDetailScreenSaga ");
     yield takeLatest(SUPPORT_DETAIL_REQUEST, getSupportDetail);
     yield takeLatest(SUPPORT_REPLY_REQUEST, saveSupportReply);
 }