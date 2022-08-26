/**
 *
 * Payment History actions
 *
 */

 export const PAYMENT_HISTORY_REQUEST = 'PAYMENT_HISTORY_REQUEST';
 export const PAYMENT_HISTORY_SUCCESS = 'PAYMENT_HISTORY_SUCCESS';
 export const PAYMENT_HISTORY_FAILURE = 'PAYMENT_HISTORY_FAILURE';
 export const PAYMENT_HISTORY_RESET_ERROR = 'PAYMENT_HISTORY_RESET_ERROR';

 export const CANCEL_SUBSCRIPTION_REQUEST = 'CANCEL_SUBSCRIPTION_REQUEST';
 export const CANCEL_SUBSCRIPTION_SUCCESS = 'CANCEL_SUBSCRIPTION_SUCCESS';
 export const CANCEL_SUBSCRIPTION_FAILURE = 'CANCEL_SUBSCRIPTION_FAILURE';
 
 export const getPaymentList = (data) => {
     console.log(" data ", data);
     return {
         type: PAYMENT_HISTORY_REQUEST,
         payload: data,
     }
 };

 export const cancelAutoRenew = (data) => {
    console.log(" data ", data);
    return {
        type: CANCEL_SUBSCRIPTION_REQUEST,
        payload: data,
    }
};
 
 export function resetError() {
     return {
         type: PAYMENT_HISTORY_RESET_ERROR,
         payload: true,
     };
 }