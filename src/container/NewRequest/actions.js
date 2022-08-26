/**
 *
 * New Request actions
 *
 */

 export const NEW_REQUEST_REQUEST = 'NEW_REQUEST_REQUEST';
 export const NEW_REQUEST_SUCCESS = 'NEW_REQUEST_SUCCESS';
 export const NEW_REQUEST_FAILURE = 'NEW_REQUEST_FAILURE';
 export const NEW_REQUEST_RESET_ERROR = 'RESET_ERROR';
 
 export const newSupportRequest = (user) => {
     return {
         type: NEW_REQUEST_REQUEST,
         payload: user,
     }
 };
 
 export function resetError() {
     return {
       type: NEW_REQUEST_RESET_ERROR,
       payload: true,
     };
   }