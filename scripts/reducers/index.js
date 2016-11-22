import { combineReducers } from 'redux';

import token from './token';
import location from './location';
import journey from './journey';

export default combineReducers({
    token,
    location,
    journey
});
