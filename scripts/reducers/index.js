import { combineReducers } from 'redux';

import token from './token';
import location from './location';
import journey from './journey';
import place from './place';

export default combineReducers({
    token,
    location,
    journey,
    place
});
