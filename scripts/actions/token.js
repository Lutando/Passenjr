import axios from 'axios';
import * as types from '../constants/ActionTypes';

function verifyJwt(jwt) {
    if(!jwt) {
        return false
    }

    const claims = atob(jwt.split(".")[1])
    const notBefore = Number(claims['nbf'])
    const expiry = Number(claims['exp']) - 300 //skew time of 5 minutes
    const now = Math.floor(new Date().getTime()/1000)

    if(notBefore < now && now < expiry) {
        return true
    }

    return false
}

export function fetchToken() {
    return function(dispatch) {

        dispatch({type: types.FETCH_TOKEN})

        const jwt = sessionStorage.getItem('jwt');

        if(!verifyJwt(jwt)) {
                axios.get("/api/token")
            .then((response) =>  {
                sessionStorage.setItem('jwt',response.data.access_token)
                dispatch({type: types.FETCH_TOKEN_FULFILLED, payload: response.data.access_token}) 
            })
            .catch((err) => {
                dispatch({type: types.FETCH_TOKEN_REJECTED, payload: err})
            })
        } else {
            dispatch({type: types.FETCH_TOKEN_FULFILLED, payload: jwt})
        }
        
    }
}