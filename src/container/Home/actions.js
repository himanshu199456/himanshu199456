/**
 *
 * Home actions
 *
 */

export const GET_SPEEDO_METER_REQUEST = 'GET_SPEEDO_METER_REQUEST';
export const GET_SPEEDO_METER_SUCCESS = 'GET_SPEEDO_METER_SUCCESS';
export const GET_SPEEDO_METER_FAILURE = 'GET_SPEEDO_METER_FAILURE';
export const GET_SPEEDO_METER_RESET_ERROR = 'GET_SPEEDO_METER_RESET_ERROR';

export const getSpeedoMeter = (data) => {
    console.log(" data ", data);
    return {
        type: GET_SPEEDO_METER_REQUEST,
        payload: data,
    }
};

export function resetError() {
    return {
        type: GET_SPEEDO_METER_RESET_ERROR,
        payload: true,
    };
}