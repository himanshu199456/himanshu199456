/**
 *
 * SignupScreen reducer
 *
 */

import { RESET_ERROR, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "./actions";



 const initialState = {
     loading: false,
     user: null,
     error: null
 };
 
 export const SignupReducer = (state = initialState, action) => {
     switch (action.type) {
         case SIGNUP_REQUEST:
             return {
                 ...state,
                 loading: true,
             };
 
         case SIGNUP_SUCCESS:
             return {
                 ...state,
                 user: action.userDetails,
                 loading: false,
             };
 
         case SIGNUP_FAILURE:
             console.log(" ACTION ", action.error);
             return {
                 ...state,
                 error: action.error,
                 loading: false,
             };
         case RESET_ERROR:
             return {
                 ...state,
                 error: null,
                 loading: false,
             };
         default:
             return state;
     }
 };
 
 export default SignupReducer;