import * as types from '../constants/ActionTypes';

export default function reducer(state ={
    journey: {},
    fetchingJourney: false,
    fetchedJourney: false,
    itineraryId: null,
    legId: null,
    stopId: null,
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
        case types.SELECT_ITINERARY: {
            return {
                ...state,
                itineraryId: action.payload,
            }
        }

        case types.SELECT_LEG: {
            return {
                ...state,
                legId: action.payload,
            }
        }

        case types.SELECT_STOP: {
            return {
                ...state,
                stopId: action.payload,
            }
        }
    }

    return state;
}