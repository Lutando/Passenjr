import axios from 'axios';
import GeoJSON from 'geojson';
import { normalize } from 'normalizr';

import * as urls from '../constants/Urls';
import * as types from '../constants/ActionTypes';

import { formatHeader, reverseCoordinates } from '../utils/TransitApiUtils';
import { journeySchema } from '../constants/Schemas'

export function fetchJourney(query) {
    return function (dispatch) {
        dispatch({type: types.FETCH_JOURNEY})


        const jwt = sessionStorage.getItem('jwt');

        //TODO replace with GeoJSON parser
        var geometryQuery = {
            type: 'MultiPoint',
            coordinates: [
                [query.departureLocation[1], query.departureLocation[0]],
                [query.arrivalLocation[1], query.arrivalLocation[0]],                
            ]
        }

        var maxItineraries = 3;

        var journeyQuery = {
            geometry: geometryQuery,
            maxItineraries: maxItineraries,
            time: '2016-12-22T16:39:48Z' //for testing
        }


        var headers = formatHeader(jwt)
        axios.defaults.headers = headers
        axios.post(`${urls.TRANSITAPI_URL}/journeys`,{...journeyQuery})
            .then((response) => {
                var a = normalize(response.data,journeySchema)
                reverseCoordinates(a);

                var dispatchData = { ...a.entities, journeyId: a.result}
                var journeyId = a.result;
                
                if(dispatchData.journeys[journeyId].itineraries.length > 0)
                {
                    dispatch({type: types.SELECT_ITINERARY, payload: dispatchData.journeys[journeyId].itineraries[0] })
                }

                dispatch({type: types.FETCH_JOURNEY_FULFILLED, payload: dispatchData})
                
            })
            .catch((err) => {
                dispatch({type: types.FETCH_JOURNEY_REJECTED})
                console.log(err)
            })

    }
}

export function setItinerary(query) {
    return function (dispatch) {
        dispatch({type: types.SELECT_ITINERARY, payload: query })
    }
}