import * as types from '../constants/ActionTypes';

export default function reducer(state ={
    journey: {},
    fetchingJourney: false,
    fetchedJourney: false,
    errorJourney: null,
}, action) {
    switch(action.type) {
        case types.FETCH_JOURNEY: {
            return {
                ...state,
                fetchingJourney: true
            }
        }
        case types.FETCH_JOURNEY_FULFILLED: {
            return {
                ...state,
                fetchingJourney:false,
                fetchedJourney:true,
                journey: action.payload
            }
        }
        case types.FETCH_JOURNEY_REJECTED: {
            return {
                ...state,
                fetchingJourney:false,
                fetchedJourney:false,
            }            
        }
    }

    return state;
}