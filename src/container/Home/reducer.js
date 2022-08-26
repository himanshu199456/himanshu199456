
/**
 *
 * Home reducer
 *
 */

 import { GET_SPEEDO_METER_FAILURE, GET_SPEEDO_METER_REQUEST, GET_SPEEDO_METER_RESET_ERROR, GET_SPEEDO_METER_SUCCESS } from "./actions";



 const initialState = {
     loading: false,
     data: null,
     error: null
 };
 
 export const HomeReducer = (state = initialState, action) => {
     switch (action.type) {
         case GET_SPEEDO_METER_REQUEST:
             return {
                 ...state,
                 loading: true,
             };
 
         case GET_SPEEDO_METER_SUCCESS:
             return {
                 ...state,
                 data: action.data,
                 loading: false,
             };
 
         case GET_SPEEDO_METER_FAILURE:
             console.log(" ACTION ", action.error);
             return {
                 ...state,
                 error: action.error,
                 loading: false,
             };
         case GET_SPEEDO_METER_RESET_ERROR:
             return {
                 ...state,
                 error: null,
                 loading: false,
             };
         default:
             return state;
     }
 };
 
 export default HomeReducer;