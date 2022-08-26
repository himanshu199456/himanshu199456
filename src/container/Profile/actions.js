/**
 *
 * TICKET actions
 *
 */

 export const EDIT_PROFILE_REQUEST = 'EDIT_PROFILE_REQUEST';
 export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';
 export const EDIT_PROFILE_FAILURE = 'EDIT_PROFILE_FAILURE';
 export const EDIT_PROFILE_RESET_ERROR = 'EDIT_PROFILE_RESET_ERROR';
 

 
 export const editUserProfile = (user) => {
     console.log(" user ", user);
     return {
         type: EDIT_PROFILE_REQUEST,
         payload: user,
     }
 };
 
 
 
 export function resetError() {
     return {
         type: EDIT_PROFILE_RESET_ERROR,
         payload: true,
     };
 }
 