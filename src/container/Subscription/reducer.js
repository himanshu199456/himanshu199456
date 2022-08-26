/**
 *
 * SubscriptionScreen reducer
 *
 */

import { APPLY_COUPON_FAILURE, APPLY_COUPON_REQUEST, APPLY_COUPON_SUCCESS, PAYMENT_DATA_RESET_ERROR, PROCEED_PAY_FAILURE, PROCEED_PAY_REQUEST, PROCEED_PAY_SUCCESS, SUBSCRIPTION_LIST_FAILURE, SUBSCRIPTION_LIST_REQUEST, SUBSCRIPTION_LIST_SUCCESS, SUBSCRIPTION_RESET_ERROR } from "./actions";




const initialState = {
    loading: false,
    subscriptionList: null,
    paymentTokenData: null,
    applyCouponData: null,
    error: null
};

export const SubscriptionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUBSCRIPTION_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case SUBSCRIPTION_LIST_SUCCESS:
            return {
                ...state,
                subscriptionList: action.data,
                loading: false,
            };

        case SUBSCRIPTION_LIST_FAILURE:
            console.log(" ACTION ", action.error);
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case PROCEED_PAY_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case PROCEED_PAY_SUCCESS:
            return {
                ...state,
                paymentTokenData: action.data,
                loading: false,
            };
        case PROCEED_PAY_FAILURE:
            console.log(" ACTION ", action.error);
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case SUBSCRIPTION_RESET_ERROR:
            return {
                ...state,
                error: null,
                loading: false,
            };
        case APPLY_COUPON_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case APPLY_COUPON_SUCCESS:
            return {
                ...state,
                applyCouponData: action.data,
                loading: false,
            };
        case APPLY_COUPON_FAILURE:
            console.log(" ACTION ", action.error);
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case PAYMENT_DATA_RESET_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false,
                paymentTokenData: null
            };
        default:
            return state;
    }
};

export default SubscriptionReducer;