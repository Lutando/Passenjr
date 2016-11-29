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
                query.departureLocation,
                query.arrivalLocation,                
            ]
        }

        var maxItineraries = 3;

        var journeyQuery = {
            geometry: geometryQuery,
            maxItineraries: maxItineraries,
            time: '2016-11-28T16:39:48Z' //for testing
        }


        var headers = formatHeader(jwt)
        axios.defaults.headers = headers
        axios.post(`${urls.TRANSITAPI_URL}/journeys`,{...journeyQuery})
            .then((response) => {
                var a = normalize(response.data,journeySchema)
                console.time('reverse')
                reverseCoordinates(a);
                console.timeEnd('reverse')
                console.log(a)

                var dispatchData = {...response.data, ...a.entities}
                console.log(dispatchData)
                dispatch({type: types.FETCH_JOURNEY_FULFILLED, payload: response.data})
                //var a = normalize(response.data,journeySchema)
                //console.log(a)

            })
            .catch((err) => {
                dispatch({type: types.FETCH_JOURNEY_REJECTED})
                console.log(err)
            })

    }
}