/**
 *
 * Forgot Password actions
 *
 */

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';
export const FORGOT_PASSWORD_RESET_ERROR = 'FORGOT_PASSWORD_RESET_ERROR';


export const forgotPasswordAction = (user) => {
    return {
        type: FORGOT_PASSWORD_REQUEST,
        payload: user,
    }
};

export function resetError() {
    return {
        type: FORGOT_PASSWORD_RESET_ERROR,
        payload: true,
    };
}
