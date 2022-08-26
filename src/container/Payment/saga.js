/**
 *
 * PaymentScreen saga
 *
 */

 import * as api from '../../api';
 import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
 import { PAYMENT_FAILURE, PAYMENT_REQUEST, PAYMENT_SUCCESS } from './actions';

 export function* payment({ payload }) {
     console.log(" payload ", payload);
     try {
         const data = yield call(api.payment.payment, payload);
         console.log(" USER DETAIL ", data);
         yield put({ type: PAYMENT_SUCCESS, data });
 
     } catch (error) {
         console.log(" error ", error);
         yield put({ type: PAYMENT_FAILURE, error });
     }
 }
 
 export default function* paymentScreenSaga() {
     console.log(" paymentScreenSaga ");
     yield takeLatest(PAYMENT_REQUEST, payment);
 }