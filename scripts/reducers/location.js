import * as types from '../constants/ActionTypes';

export default function reducer(state = {
    departureLocation : [],
    arrivalLocation : [],
    errorLocation: null,
}, action) {
    switch(action.type) {
        case types.SET_LOCATION: {
            return {
                
            }
        }
    }

    return state;
}