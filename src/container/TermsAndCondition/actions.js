/**
 *
 * Terms And Condition actions
 *
 */

 export const TERMS_AND_CONDITION_REQUEST = 'TERMS_AND_CONDITION_REQUEST';
 export const TERMS_AND_CONDITION_SUCCESS = 'TERMS_AND_CONDITION_SUCCESS';
 export const TERMS_AND_CONDITION_FAILURE = 'TERMS_AND_CONDITION_FAILURE';
 export const TERMS_AND_CONDITION_RESET_ERROR = 'TERMS_AND_CONDITION_RESET_ERROR';
 
 export const getTermsAndConditionData = (data) => {
     console.log(" data ", data);
     return {
         type: TERMS_AND_CONDITION_REQUEST,
         payload: data,
     }
 };
 
 export function resetError() {
     return {
         type: TERMS_AND_CONDITION_RESET_ERROR,
         payload: true,
     };
 }