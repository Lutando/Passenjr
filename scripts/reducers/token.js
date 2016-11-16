import * as types from '../constants/ActionTypes';

export default function reducer(state ={
    token: "",
    fetching: false,
    fetched: false,
    error: null,
}, action) {
    switch(action.type) {
        case types.FETCH_TOKEN: {
            return {
                ...state,
                fetching: true
            }
        }
        case types.FETCH_TOKEN_FULFILLED: {
            return {
                ...state,
                fetching:false,
                fetched:true,
                token: action.payload
            }
        }
        case types.FETCH_TOKEN_REJECTED: {
            return {
                ...state,
                fetching:false,
                fetched:false,
            }            
        }
    }

    return state;
}