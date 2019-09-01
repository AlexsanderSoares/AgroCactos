import { combineReducers } from 'redux';

import {reducer as offline} from 'redux-offline-queue';
import {reducer as schedulings} from './schedulings';
import {reducer as errors} from './errors';

export default combineReducers({
    offline,
    schedulings,
    errors,
});