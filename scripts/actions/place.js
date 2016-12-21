import axios from 'axios';
import { normalize } from 'normalizr';

import * as urls from '../constants/Urls';
import * as types from '../constants/ActionTypes';
import * as locales from '../constants/Locales';

function fetchPlace(query, actionType) {
    return function (dispatch) {

        dispatch({type: actionType.fetch})

        const placesQuery = {
            query: query,
            countries: locales.SUPPORTED
        }

        var retries = 0

        axios.post(`${urls.ALGOLIA_URLS[retries]}/1/places/query`,{...placesQuery})
            .then((response) => {
                dispatch({type: actionType.fulfill, payload: response.data})
                //console.log(response)
            })
            .catch((err) => {
                //enact retry policy
                retries++
                
                while(retries < 4)
                {
                    axios.post(`${urls.ALGOLIA_URLS[retries]}/1/places/query`,{...placesQuery})
                        .then((response) => {
                            retries = 4;
                            dispatch({type: actionType.fulfill, payload: response.data})
                            //dispatch action
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
                dispatch({type: actionType.reject})
                console.log(err)
            })

    }
}

export function fetchArrivalPlace(query) {
    
    const { FETCH_ARRIVAL_PLACE, FETCH_ARRIVAL_PLACE_FULFILLED, FETCH_ARRIVAL_PLACE_REJECTED } = types;
    
    const action = {
        fetch: FETCH_ARRIVAL_PLACE,
        fulfill: FETCH_ARRIVAL_PLACE_FULFILLED,
        reject: FETCH_ARRIVAL_PLACE_REJECTED,
    }

    return fetchPlace(query,action)
}

export function fetchDeparturePlace(query) {
    
    const { FETCH_DEPARTURE_PLACE, FETCH_DEPARTURE_PLACE_FULFILLED, FETCH_DEPARTURE_PLACE_REJECTED } = types;
    
    const action = {
        fetch: FETCH_DEPARTURE_PLACE,
        fulfill: FETCH_DEPARTURE_PLACE_FULFILLED,
        reject: FETCH_DEPARTURE_PLACE_REJECTED,
    }

    return fetchPlace(query,action)
}