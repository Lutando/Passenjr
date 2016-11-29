import * as types from '../constants/ActionTypes';

export default function reducer(state ={
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
                ...action.payload,
                fetchingJourney:false,
                fetchedJourney:true,
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
                legId: null,
                stopId: null
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