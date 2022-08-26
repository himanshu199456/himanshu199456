/**
 *
 * Login actions
 *
 */

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const RESET_ERROR = 'RESET_ERROR';
export const USER_LOGOUT = 'USER_LOGOUT';

export const getLoginDetails = (user) => {
    console.log(" user ",user);
    return {
        type: LOGIN_REQUEST,
        payload: user,
    }
};

export const saveUserDataToStore = (user) => {
  console.log(" user ",user);
  return {
      type: LOGIN_SUCCESS,
      userDetails: user,
  }
};

export function resetError() {
    return {
      type: RESET_ERROR,
      payload: true,
    };
  }

  export function logoutAction() {
    return {
      type: USER_LOGOUT
    };
  }