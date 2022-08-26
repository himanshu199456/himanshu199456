/**
 *
 * Ticket saga
 *
 */

import * as api from '../../api';
import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
import { EDIT_DETAIL_TICKET_FAILURE, EDIT_DETAIL_TICKET_REQUEST, EDIT_DETAIL_TICKET_SUCCESS, GET_CITY_BY_STATE_FAILURE, GET_CITY_BY_STATE_REQUEST, GET_CITY_BY_STATE_SUCCESS, GET_COURT_BY_CITY_FAILURE, GET_COURT_BY_CITY_REQUEST, GET_COURT_BY_CITY_SUCCESS, GET_MASTER_DATA_FAILURE, GET_MASTER_DATA_REQUEST, GET_MASTER_DATA_SUCCESS, GET_SUB_MEMBER_FAILURE, GET_SUB_MEMBER_REQUEST, GET_SUB_MEMBER_REQUEST_FAILURE, GET_SUB_MEMBER_REQUEST_SUCCESS, GET_SUB_MEMBER_SUCCESS, SAVE_TICKET_FAILURE, SAVE_TICKET_REQUEST, SAVE_TICKET_SUCCESS } from './actions';

export function* getMasterDetails({ payload }) {
    console.log(" payload ", payload);
    try {
        const data = yield call(api.ticket.getMasterDataDetail, payload);
        console.log(" DATA ", data);
        let newArray = [];
        let newStates = [];
        let newViolations = [];
        data.states.map((items, index) => {
            newStates[newStates.length] = {
                label: items.state_name,
                value: items.state_name,
                id: items.id
            }
        })

        data.violations.map((items, index) => {
            newViolations[newViolations.length] = {
                label: items.violation_name,
                value: items.violation_name,
                id: items.id,
                description: items.description
            }
        })

        data['states'] = newStates
        data['violations'] = newViolations

        yield put({ type: GET_MASTER_DATA_SUCCESS, data });
    } catch (error) {
        console.log(" error ", error);
        yield put({ type: GET_MASTER_DATA_FAILURE, error });
    }
}

export function* getCityFromState({ payload }) {
    console.log(" payload ", payload);
    try {
        const data = yield call(api.ticket.getCity, payload);
        console.log(" DATA ", data);
        let newCity = []
        data.city.map((item, index) => {
            newCity[newCity.length] = {
                label: item.city_name,
                value: item.city_name,
                id: item.id
            }
        })

        data['city'] = newCity
        yield put({ type: GET_CITY_BY_STATE_SUCCESS, data });
    } catch (error) {
        console.log(" error ", error);
        yield put({ type: GET_CITY_BY_STATE_FAILURE, error });
    }
}


export function* getCourtByCity({ payload }) {
    console.log(" payload ", payload);
    try {
        const data = yield call(api.ticket.getCourt, payload);
        console.log(" DATA ", data);
        let newCourt = []
        data.court.map((item, index) => {
            newCourt[newCourt.length] = {
                label: item.court_name,
                value: item.court_name,
                id: item.id,
                address: item.address,
                zipcode: item.zipcode
            }
        })

        data['court'] = newCourt

        yield put({ type: GET_COURT_BY_CITY_SUCCESS, data });
    } catch (error) {
        console.log(" error ", error);
        yield put({ type: GET_COURT_BY_CITY_FAILURE, error});
    }
}

export function* savePostTicket({ payload }) {
    console.log(" payload ", payload);
    try {
        const data = yield call(api.ticket.saveTicket, payload);
        console.log(" DATA ", data);
        yield put({ type: SAVE_TICKET_SUCCESS, data: 'Ticket Added successfully!' });
    } catch (error) {
        console.log(" error ", error);
        yield put({ type: SAVE_TICKET_FAILURE, error});
    }
}

export function* getPostTicketDetail({ payload }) {
    console.log(" payload ", payload);
    try {
        const data = yield call(api.ticket.getEditDetail, payload);
        console.log(" DATA ", data);
        let newData = data[0];
        newData['line_gauge_data'] = data.line_gauge_data
        yield put({ type: EDIT_DETAIL_TICKET_SUCCESS, data: data[0] });
    } catch (error) {
        console.log(" error ", error);
        yield put({ type: EDIT_DETAIL_TICKET_FAILURE, error});
    }
}

export function* getSubMemberList({ payload }) {
    console.log(" payload ", payload);
    try {
        const data = yield call(api.ticket.getSubMember, payload);
        console.log(" DATA ", data);
        let newList = []
        data.member_list.map((item, index) => {
            let newData = item;
            newData['label'] = item.name
            newData['value'] = item.name

            newList[newList.length] = newData
        })

        data['member_list'] = newList
        yield put({ type: GET_SUB_MEMBER_SUCCESS, data: data });
    } catch (error) {
        console.log(" error ", error);
        yield put({ type: GET_SUB_MEMBER_FAILURE, error});
    }
}

export default function* ticketScreenSaga() {
    console.log(" ticketScreenSaga ");
    yield takeLatest(GET_MASTER_DATA_REQUEST, getMasterDetails);
    yield takeLatest(GET_CITY_BY_STATE_REQUEST, getCityFromState);
    yield takeLatest(GET_COURT_BY_CITY_REQUEST, getCourtByCity);
    yield takeLatest(SAVE_TICKET_REQUEST, savePostTicket);
    yield takeLatest(EDIT_DETAIL_TICKET_REQUEST, getPostTicketDetail);
    yield takeLatest(GET_SUB_MEMBER_REQUEST, getSubMemberList);
}