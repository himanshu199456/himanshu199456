/**
 *
 * AddMember reducer
 *
 */

import { ADD_MEMBER_FAILURE, ADD_MEMBER_REQUEST, ADD_MEMBER_RESET_ERROR, ADD_MEMBER_SUCCESS } from "./action";





 const initialState = {
     loading: false,
     success: null,
     resetSuccessfully: null,
     error: null,
 };
 
 export const AddMemberReducer = (state = initialState, action) => {
     switch (action.type) {
         case ADD_MEMBER_REQUEST:
             return {
                 ...state,
                 loading: true,
             };
 
         case ADD_MEMBER_SUCCESS:
             console.log(" CHECK DATA ", action.data);
             return {
                 ...state,
                 success: action.data,
                 loading: false,
             };
 
         case ADD_MEMBER_FAILURE:
             return {
                 ...state,
                 error: action.error,
                 loading: false,
             };
         case ADD_MEMBER_RESET_ERROR:
             return {
                 ...state,
                 loading: false,
                 success: null,
                 error: null,
             };
         default:
             return state;
     }
 };
 
 export default AddMemberReducer;