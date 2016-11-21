import axios from 'axios';
import * as types from '../constants/ActionTypes';

export function fetchJourney(query) {
    return function (dispatch) {

        dispatch({type: types.FETCH_JOURNEY})
        
        axios.get("/api/journey")
    }
}