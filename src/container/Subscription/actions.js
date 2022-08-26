/**
 *
 * SUBSCRIPTION actions
 *
 */

export const SUBSCRIPTION_LIST_REQUEST = 'SUBSCRIPTION_LIST_REQUEST';
export const SUBSCRIPTION_LIST_SUCCESS = 'SUBSCRIPTION_LIST_SUCCESS';
export const SUBSCRIPTION_LIST_FAILURE = 'SUBSCRIPTION_LIST_FAILURE';

export const PROCEED_PAY_REQUEST = 'PROCEED_PAY_REQUEST';
export const PROCEED_PAY_SUCCESS = 'PROCEED_PAY_SUCCESS';
export const PROCEED_PAY_FAILURE = 'PROCEED_PAY_FAILURE';

export const APPLY_COUPON_REQUEST = 'APPLY_COUPON_REQUEST';
export const APPLY_COUPON_SUCCESS = 'APPLY_COUPON_SUCCESS';
export const APPLY_COUPON_FAILURE = 'APPLY_COUPON_FAILURE';


export const SUBSCRIPTION_RESET_ERROR = 'RESET_ERROR';
export const PAYMENT_DATA_RESET_ERROR = 'PAYMENT_DATA_RESET_ERROR';

export const getSubscriptionList = (user) => {
    console.log(" user ", user);
    return {
        type: SUBSCRIPTION_LIST_REQUEST,
        payload: user,
    }
};

export const proccessPaymentData = (user) => {
    console.log(" user ", user);
    return {
        type: PROCEED_PAY_REQUEST,
        payload: user,
    }
};

export const applyCouponAPI = (user) => {
    console.log(" user ", user);
    return {
        type: APPLY_COUPON_REQUEST,
        payload: user,
    }
};

export const resetPaymentData = () => {
    return {
        type: PAYMENT_DATA_RESET_ERROR,
        payload: true,
    }
};

export function resetError() {
    return {
        type: SUBSCRIPTION_RESET_ERROR,
        payload: true,
    };
}