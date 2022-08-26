/**
 *
 * ChangePassword saga
 *
 */

 import * as api from '../../api';
 import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
 import { ADD_MEMBER_FAILURE, ADD_MEMBER_REQUEST, ADD_MEMBER_SUCCESS, CHANGE_PASSWORD_FAILURE, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, GET_OTP_FAILURE, GET_OTP_REQUEST, GET_OTP_SUCCESS } from './action';
 
 
 export function* addFamilyMember({ payload }) {
     console.log(" payload ", payload);
     try {
         const data = yield call(api.addMember.addMember, payload);
         console.log(" USER DETAIL ", data);
         yield put({ type: ADD_MEMBER_SUCCESS, data });
 
     } catch (error) {
         console.log(" error ", error);
         yield put({ type: ADD_MEMBER_FAILURE, error });
     }
 }

 export default function* addMemberSaga() {
     console.log(" addMemberSaga ");
     yield takeLatest(ADD_MEMBER_REQUEST, addFamilyMember);
 }