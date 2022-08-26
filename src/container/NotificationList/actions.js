/**
 *
 * Notification actions
 *
 */

 export const NOTIFICATION_LIST_REQUEST = 'NOTIFICATION_LIST_REQUEST';
 export const NOTIFICATION_LIST_SUCCESS = 'NOTIFICATION_LIST_SUCCESS';
 export const NOTIFICATION_LIST_FAILURE = 'NOTIFICATION_LIST_FAILURE';
 export const NOTIFICATION_RESET_ERROR = 'NOTIFICATION_RESET_ERROR';
 
 export const getNotificationList = (user) => {
     console.log(" user ",user);
     return {
         type: NOTIFICATION_LIST_REQUEST,
         payload: user,
     }
 };
 
 export function resetError() {
     return {
       type: NOTIFICATION_RESET_ERROR,
       payload: true,
     };
   }