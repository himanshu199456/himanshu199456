/**
 *
 * Home saga
 *
 */

 import * as api from '../../api';
 import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
 import { GET_SPEEDO_METER_FAILURE, GET_SPEEDO_METER_REQUEST, GET_SPEEDO_METER_SUCCESS } from './actions';
 
 
 export function* getSpeedoMeterData({ payload }) {
     console.log(" payload ", payload);
     try {
         const data = yield call(api.home.getSpeedoMeterData, payload);
         console.log(" SPEEDOMETER ", data);
         yield put({ type: GET_SPEEDO_METER_SUCCESS, data:data });
     } catch (error) {
         console.log(" error ", error);
         yield put({ type: GET_SPEEDO_METER_FAILURE, error: error });
     }
 }
 
 export default function* homeScreenSaga() {
     console.log(" homeScreenSaga ");
     yield takeLatest(GET_SPEEDO_METER_REQUEST, getSpeedoMeterData);
 }