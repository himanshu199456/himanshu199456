/**
 *
 * Change Password actions
 *
 */
export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';
export const CHANGE_PASSWORD_RESET_ERROR = 'CHANGE_PASSWORD_RESET_ERROR';

export const CHANGE_FORGOT_PASSWORD_REQUEST = 'CHANGE_FORGOT_PASSWORD_REQUEST';
export const CHANGE_FORGOT_PASSWORD_SUCCESS = 'CHANGE_FORGOT_PASSWORD_SUCCESS';
export const CHANGE_FORGOT_PASSWORD_FAILURE = 'CHANGE_FORGOT_PASSWORD_FAILURE';

export const GET_OTP_REQUEST = 'GET_OTP_REQUEST';
export const GET_OTP_SUCCESS = 'GET_OTP_SUCCESS';
export const GET_OTP_FAILURE = 'GET_OTP_FAILURE';


export const changePasswordAction = (payload) => {
    return {
        type: CHANGE_PASSWORD_REQUEST,
        payload 
    }
};

export const forgotPasswordAction = (payload) => {
  return {
      type: CHANGE_FORGOT_PASSWORD_REQUEST,
      payload 
  }
};

export const getOTPAction = (payload) => {
  return {
      type: GET_OTP_REQUEST,
      payload 
  }
};

export function resetError() {
    return {
      type: CHANGE_PASSWORD_RESET_ERROR,
      payload: true,
    };
  }