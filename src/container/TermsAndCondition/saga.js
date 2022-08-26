/**
 *
 * Terms and condition saga
 *
 */

 import * as api from '../../api';
 import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
 import { TERMS_AND_CONDITION_FAILURE, TERMS_AND_CONDITION_REQUEST, TERMS_AND_CONDITION_SUCCESS } from './actions';
 
 
 export function* getTermsAndConditionData({ payload }) {
     console.log(" payload ", payload);
     try {
         const data = yield call(api.termsCondition.getTermsData, payload);
         console.log(" VIEW TICKET ", data);
         yield put({ type: TERMS_AND_CONDITION_SUCCESS, data:data[0] });
     } catch (error) {
         console.log(" error ", error);
         yield put({ type: TERMS_AND_CONDITION_FAILURE, error: error });
     }
 }
 
 export default function* termsConditionScreenSaga() {
     console.log(" termsConditionScreenSaga ");
     yield takeLatest(TERMS_AND_CONDITION_REQUEST, getTermsAndConditionData);
 }