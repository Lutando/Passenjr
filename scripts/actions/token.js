import axios from 'axios';
import * as types from '../constants/ActionTypes';

export function fetchToken() {
    return function(dispatch) {
        dispatch({type: types.FETCH_TOKEN})
        axios.get("/api/token")
        .then((response) =>  {
            dispatch({type: types.FETCH_TOKEN_FULFILLED, payload: response.data}) 
        })
        .catch((err) => {
            dispatch({type: types.FETCH_TOKEN_REJECTED, payload: err})
        })
    }
}