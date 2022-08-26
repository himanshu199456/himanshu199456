/**
 *
 * Payment actions
 *
 */

 export const PAYMENT_REQUEST = 'PAYMENT_REQUEST';
 export const PAYMENT_SUCCESS = 'PAYMENT_SUCCESS';
 export const PAYMENT_FAILURE = 'PAYMENT_FAILURE';
 export const PAYMENT_RESET_ERROR = 'PAYMENT_RESET_ERROR';
 
 export const paymentDo = (user) => {
     console.log(" user ",user);
     return {
         type: PAYMENT_REQUEST,
         payload: user,
     }
 };
 
 export function resetError() {
     return {
       type: PAYMENT_RESET_ERROR,
       payload: true,
     };
   }