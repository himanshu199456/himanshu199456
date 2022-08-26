/**
 *
 * View Ticket saga
 *
 */

import * as api from '../../api';
import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
import { VIEW_TICKET_FAILURE, VIEW_TICKET_REQUEST, VIEW_TICKET_SUCCESS } from './action';


export function* getViewTicketList({ payload }) {
    console.log(" payload ", payload);
    try {
        const data = yield call(api.viewTicket.viewCaseTicket, payload);
        console.log(" VIEW TICKET ", data);
        let newArray = []
        data.map((item) => {
            let newValue = item
            newValue['value'] = item.court_name+' / '+item.ticket_reference_no
            newValue['label'] = item.court_name+' / '+item.ticket_reference_no
            newArray[newArray.length] = newValue
        })

        yield put({ type: VIEW_TICKET_SUCCESS, data: newArray });
    } catch (error) {
        console.log(" error ", error);
        yield put({ type: VIEW_TICKET_FAILURE, error: error });
    }
}

export default function* viewTicketScreenSaga() {
    console.log(" viewTicketScreenSaga ");
    yield takeLatest(VIEW_TICKET_REQUEST, getViewTicketList);
}