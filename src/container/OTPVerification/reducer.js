/**
 *
 * OTP Verify reducer
 *
 */

import { VERIFY_OTP_FAILURE, VERIFY_OTP_REQUEST, VERIFY_OTP_RESET_ERROR, VERIFY_OTP_SUCCESS } from "./actions";



 const initialState = {
     loading: false,
     success: null,
     error: null
 };
 
 export const OTPVerifyReducer = (state = initialState, action) => {
     switch (action.type) {
         case VERIFY_OTP_REQUEST:
             return {
                 ...state,
                 loading: true,
             };
 
         case VERIFY_OTP_SUCCESS:
             return {
                 ...state,
                 success: action.userDetails,
                 loading: false,
             };
 
         case VERIFY_OTP_FAILURE:
             console.log(" ACTION ", action.error);
             return {
                 ...state,
                 error: action.error,
                 loading: false,
             };
         case VERIFY_OTP_RESET_ERROR:
             return {
                 ...state,
                 error: null,
                 loading: false,
                 success:null
             };
         default:
             return state;
     }
 };
 
 export default OTPVerifyReducer;