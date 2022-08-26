/**
 *
 * ChatScreen saga
 *
 */

import * as api from '../../api';
import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
import { CHAT_LIST_FAILURE, CHAT_LIST_REQUEST, CHAT_LIST_SUCCESS, CHAT_SAVE_MESSAGE_FAILURE, CHAT_SAVE_MESSAGE_REQUEST, CHAT_SAVE_MESSAGE_SUCCESS } from './actions';

export function* chatList({ payload }) {
    console.log(" payload ", payload);
    try {
        const data = yield call(api.chat.getChatList, payload);
        console.log(" USER DETAIL ", data);
        yield put({ type: CHAT_LIST_SUCCESS, data });

    } catch (error) {
        console.log(" error ", error);
        yield put({ type: CHAT_LIST_FAILURE, error });
    }
}

export function* saveMessage({ payload }) {
    console.log(" payload ", payload);
    try {
        const data = yield call(api.chat.saveChatMessage, payload);
        console.log(" USER DETAIL ", data);
        yield put({ type: CHAT_SAVE_MESSAGE_SUCCESS, data });

    } catch (error) {
        console.log(" error ", error);
        yield put({ type: CHAT_SAVE_MESSAGE_FAILURE, error });
    }
}

export default function* chatScreenSaga() {
    console.log(" chatScreenSaga ");
    yield takeLatest(CHAT_LIST_REQUEST, chatList);
    yield takeLatest(CHAT_SAVE_MESSAGE_REQUEST, saveMessage);
}