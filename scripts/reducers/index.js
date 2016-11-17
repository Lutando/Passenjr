import { combineReducers } from 'redux';

import token from './token';
import location from './location';

export default combineReducers({
    token,
    location
});
