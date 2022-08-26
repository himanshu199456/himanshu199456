/**
 *
 * NotificationScreen reducer
 *
 */

 import { PAYMENT_FAILURE, PAYMENT_REQUEST, PAYMENT_RESET_ERROR, PAYMENT_SUCCESS } from "./actions";



 const initialState = {
     loading: false,
     paymentData: null,
     error: null
 };
 
 export const PaymentReducer = (state = initialState, action) => {
     switch (action.type) {
         case PAYMENT_REQUEST:
             return {
                 ...state,
                 loading: true,
             };
 
         case PAYMENT_SUCCESS:
             return {
                 ...state,
                 paymentData: action.data,
                 loading: false,
             };
 
         case PAYMENT_FAILURE:
             console.log(" ACTION ", action.error);
             return {
                 ...state,
                 error: action.error,
                 loading: false,
             };
         case PAYMENT_RESET_ERROR:
             return {
                 ...state,
                 error: null,
                 loading: false,
             };
         default:
             return state;
     }
 };
 
 export default PaymentReducer;