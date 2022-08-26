/**
 *
 * Verify OTP actions
 *
 */

 export const VERIFY_OTP_REQUEST = 'VERIFY_OTP_REQUEST';
 export const VERIFY_OTP_SUCCESS = 'VERIFY_OTP_SUCCESS';
 export const VERIFY_OTP_FAILURE = 'VERIFY_OTP_FAILURE';
 export const VERIFY_OTP_RESET_ERROR = 'VERIFY_OTP_RESET_ERROR';
 
 export const verifyOTP = (user) => {
     console.log(" user ",user);
     return {
         type: VERIFY_OTP_REQUEST,
         payload: user,
     }
 };
 
 export function resetError() {
     return {
       type: VERIFY_OTP_RESET_ERROR,
       payload: true,
     };
   }
