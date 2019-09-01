import { createReducer } from 'reduxsauce';

import { SchedulingTypes } from './schedulings';

const INITIAL_STATE = {
    error: false,
    message: null, 
};

const errorEndScheduling = (state = INITIAL_STATE, action) => ({ error: true,
    message: action.message,
});

const successEndScheduling = (state = INITIAL_STATE, action) => ({ error: false,
    message: null,
});

const errorListSchedulings = (state = INITIAL_STATE, action) => ({ error: true, message: action.message});

const successListSchedulings = (state = INITIAL_STATE, action) => ({ error: false, message: null });

export const reducer = createReducer(INITIAL_STATE, {
    [SchedulingTypes.ERROR_END_SCHEDULING]: errorEndScheduling,
    [SchedulingTypes.END_SCHEDULING]: successEndScheduling,
    [SchedulingTypes.ERROR_LIST_SCHEDULINGS]: errorListSchedulings,
    [SchedulingTypes.LIST_SCHEDULINGS]: successListSchedulings,
});