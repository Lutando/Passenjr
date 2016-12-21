import * as types from '../constants/ActionTypes';

export default function reducer(state ={
    placeHits: null
    

}, action) {
    switch(action.type){
        case types.FETCH_ARRIVAL_PLACE: {
            return {
                ...state,

            }
        }
        case types.FETCH_DEPARTURE_PLACE: {
            return {
                ...state,
                
            }
        }
        case types.FETCH_ARRIVAL_PLACE_FULFILLED: {
            return {
                ...state,
                arrival: action.payload,
            }
        }
        case types.FETCH_DEPARTURE_PLACE_FULFILLED: {
            return {
                ...state,
                departure: action.payload,
            }
        }
        case types.FETCH_ARRIVAL_PLACE_REJECTED: {
            return {
                ...state,

            }
        }
        case types.FETCH_DEPARTURE_PLACE_REJECTED: {
            return {
                ...state,
                
            }
        }
        
    }

    return state;
}