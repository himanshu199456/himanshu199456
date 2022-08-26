
/**
 *
 * Terms and condition reducer
 *
 */

 import { TERMS_AND_CONDITION_FAILURE, TERMS_AND_CONDITION_REQUEST, TERMS_AND_CONDITION_RESET_ERROR, TERMS_AND_CONDITION_SUCCESS } from "./actions";



 const initialState = {
     loading: false,
     data: null,
     error: null
 };
 
 export const TermsConditionReducer = (state = initialState, action) => {
     switch (action.type) {
         case TERMS_AND_CONDITION_REQUEST:
             return {
                 ...state,
                 loading: true,
             };
 
         case TERMS_AND_CONDITION_SUCCESS:
             return {
                 ...state,
                 data: action.data,
                 loading: false,
             };
 
         case TERMS_AND_CONDITION_FAILURE:
             console.log(" ACTION ", action.error);
             return {
                 ...state,
                 error: action.error,
                 loading: false,
             };
         case TERMS_AND_CONDITION_RESET_ERROR:
             return {
                 ...state,
                 error: null,
                 loading: false,
             };
         default:
             return state;
     }
 };
 
 export default TermsConditionReducer;