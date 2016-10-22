import * as types from '../constants/ActionTypes';

export default function reducer(state ={
    token: "",
    fetching: false,
    fetched: false,
    error: null,
}, action) {
    console.log('in reducer');
    console.log(action.type);
    switch(action.type) {
        case types.FETCH_TOKEN: {
            return {...state, fetching: true}
        }
    }

    return state;
}