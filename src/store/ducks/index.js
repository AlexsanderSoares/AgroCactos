import { combineReducers } from 'redux';

import {reducer as offline} from 'redux-offline-queue';
import {reducer as schedulings} from './schedulings';

export default combineReducers({
    offline,
    schedulings,
});