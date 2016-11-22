import axios from 'axios';
import * as types from '../constants/ActionTypes';



export function setDepartureLocation(location) {
    return function(dispatch) {
        dispatch({type: types.SET_DEPARTURE_LOCATION, payload: location})
    }
}

export function setArrivalLocation(location) {
    return function(dispatch) {
        dispatch({type: types.SET_ARRIVAL_LOCATION, payload: location})
    }
}