import { createActions, createReducer } from 'reduxsauce';
import { markActionsOffline } from 'redux-offline-queue';

const { Types, Creators } = createActions({
    schedulingsRequest: [],
    listSchedulings: ['schedulings'],
    addScheduling: ['scheduling'],
    updateScheduling: ['id'],
    endSchedulingRequest: ['id'],
    endScheduling: ['id'],
    error: [],
});

markActionsOffline(Creators, ['endScheduling']);

export const SchedulingTypes = Types;
export default Creators;

const INITIAL_STATE = {
    data: [],
    loading: false,
    error: null,
};

const listSchedulings = (state = INITIAL_STATE, action) => 
                            ({ data: action.schedulings, loading: false, error: false });

const addScheduling = (state = INITIAL_STATE, action) => 
                            ({...state, data: [...data, action.scheduling]});

const update = (state = INITIAL_STATE, action) => 
            state.data.map(scheduling => 
                        scheduling.id == action.scheduling.id
                        ? {...scheduling, finished: !scheduling.finished}
                        : scheduling
                    );

const remove = (state = INITIAL_STATE, action) => 
                state.filter(scheduling => scheduling.id != action.scheduling.id);

const loadingRequest = (state = INITIAL_STATE, action) => ({...state, loading: true});

const errorSchedulings = (state = INITIAL_STATE, action) => ({...state, error: action.error});


export const reducer = createReducer(INITIAL_STATE, {

    [Types.LIST_SCHEDULINGS]: listSchedulings,
    [Types.ERROR]: errorSchedulings,
    [Types.SCHEDULINGS_REQUEST]: loadingRequest,
    [Types.END_SCHEDULING_REQUEST]: loadingRequest,
    [Types.ADD_SCHEDULING]: addScheduling,
    [Types.UPDATE_SCHEDULING]: update,
    [Types.END_SCHEDULINGS]: remove,
});

