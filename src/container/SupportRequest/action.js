/**
 *
 * Support Request actions
 *
 */

 export const SUPPORT_REQUEST = 'SUPPORT_REQUEST';
 export const SUPPORT_SUCCESS = 'SUPPORT_SUCCESS';
 export const SUPPORT_FAILURE = 'SUPPORT_FAILURE';
 export const SUPPORT_RESET_ERROR = 'SUPPORT_RESET_ERROR';
 
 export const getSupportRequest = (data) => {
     console.log(" data ",data);
     return {
         type: SUPPORT_REQUEST,
         payload: data,
     }
 };
 
 export function resetError() {
     return {
       type: SUPPORT_RESET_ERROR,
       payload: true,
     };
   }