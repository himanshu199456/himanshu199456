/**
 *
 * ReferScreen reducer
 *
 */

import { REFER_FAILURE, REFER_REQUEST, REFER_RESET_ERROR, REFER_SUCCESS } from "./actions";



 const initialState = {
     loading: false,
     referSuccess: null,
     error: null
 };
 
 export const ReferReducer = (state = initialState, action) => {
     switch (action.type) {
         case REFER_REQUEST:
             return {
                 ...state,
                 loading: true,
             };
 
         case REFER_SUCCESS:
             return {
                 ...state,
                 referSuccess: action.data,
                 loading: false,
             };
 
         case REFER_FAILURE:
             console.log(" ACTION ", action.error);
             return {
                 ...state,
                 error: action.error,
                 loading: false,
             };
         case REFER_RESET_ERROR:
             return {
                 ...state,
                 error: null,
                 loading: false,
                 referSuccess: null,
             };
         default:
             return state;
     }
 };
 
 export default ReferReducer;