/**
 *
 * Signup actions
 *
 */

 export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
 export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
 export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
 export const RESET_ERROR = 'RESET_ERROR';
 
 export const registerUserAction = (user) => {
     console.log(" user ",user);
     return {
         type: SIGNUP_REQUEST,
         payload: user,
     }
 };
 
 export function resetError() {
     return {
       type: RESET_ERROR,
       payload: true,
     };
   }