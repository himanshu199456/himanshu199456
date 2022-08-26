/**
 *
 * NotificationScreen reducer
 *
 */

 import { NOTIFICATION_LIST_FAILURE, NOTIFICATION_LIST_REQUEST, NOTIFICATION_LIST_SUCCESS, NOTIFICATION_RESET_ERROR } from "./actions";



 const initialState = {
     loading: false,
     notificationList: null,
     error: null
 };
 
 export const NotificationReducer = (state = initialState, action) => {
     switch (action.type) {
         case NOTIFICATION_LIST_REQUEST:
             return {
                 ...state,
                 loading: true,
             };
 
         case NOTIFICATION_LIST_SUCCESS:
             return {
                 ...state,
                 notificationList: action.data,
                 loading: false,
             };
 
         case NOTIFICATION_LIST_FAILURE:
             console.log(" ACTION ", action.error);
             return {
                 ...state,
                 error: action.error,
                 loading: false,
             };
         case NOTIFICATION_RESET_ERROR:
             return {
                 ...state,
                 error: null,
                 loading: false,
             };
         default:
             return state;
     }
 };
 
 export default NotificationReducer;