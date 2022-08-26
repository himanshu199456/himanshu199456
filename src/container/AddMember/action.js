/**
 *
 * Add member actions
 *
 */
 export const ADD_MEMBER_REQUEST = 'ADD_MEMBER_REQUEST';
 export const ADD_MEMBER_SUCCESS = 'ADD_MEMBER_SUCCESS';
 export const ADD_MEMBER_FAILURE = 'ADD_MEMBER_FAILURE';
 export const ADD_MEMBER_RESET_ERROR = 'ADD_MEMBER_RESET_ERROR';
 
 
 export const addMember = (payload) => {
     return {
         type: ADD_MEMBER_REQUEST,
         payload 
     }
 };
 
 
 export function resetError() {
     return {
       type: ADD_MEMBER_RESET_ERROR,
       payload: true,
     };
   }