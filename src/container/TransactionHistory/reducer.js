/**
 *
 * Payment History reducer
 *
 */

import { CANCEL_SUBSCRIPTION_FAILURE, CANCEL_SUBSCRIPTION_REQUEST, CANCEL_SUBSCRIPTION_SUCCESS, PAYMENT_HISTORY_FAILURE, PAYMENT_HISTORY_REQUEST, PAYMENT_HISTORY_RESET_ERROR, PAYMENT_HISTORY_SUCCESS } from "./actions";




const initialState = {
    loading: false,
    paymentList: null,
    isCancelSuccess: null,
    error: null
};

export const PaymentHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAYMENT_HISTORY_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case PAYMENT_HISTORY_SUCCESS:
            return {
                ...state,
                paymentList: action.data,
                loading: false,
            };

        case PAYMENT_HISTORY_FAILURE:
            console.log(" ACTION ", action.error);
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case PAYMENT_HISTORY_RESET_ERROR:
            return {
                ...state,
                error: null,
                loading: false,
                isCancelSuccess:null
            };
        case CANCEL_SUBSCRIPTION_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case CANCEL_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                isCancelSuccess: action.data,
                loading: false,
            };

        case CANCEL_SUBSCRIPTION_FAILURE:
            console.log(" ACTION ", action.error);
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        default:
            return state;
    }
};

export default PaymentHistoryReducer;