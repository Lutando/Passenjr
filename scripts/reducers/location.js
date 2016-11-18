import * as types from '../constants/ActionTypes';

export default function reducer(state = {
    departureLocation : [],
    arrivalLocation : [],
    errorLocation: null,
}, action) {
    switch(action.type) {
        case types.SET_ARRIVAL_LOCATION: {
            return {
                ...state,
                arrivalLocation: action.payload
            }
        }
        case types.SET_DEPARTURE_LOCATION: {
            return {
                ...state,
                departureLocation: action.payload
            }
        }
    }

    return state;
}