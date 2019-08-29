import { createActions, createReducer } from 'reduxsauce';
import { markActionsOffline } from 'redux-offline-queue';

const { Types, Creators } = createActions({
    schedulingsRequest: null,
    listSchedulings: ['schedulings'],
    addScheduling: ['scheduling'],
    updateScheduling: ['id'],
    endSchedulingRequest: ['id'],
    endScheduling: ['id'],
    error: ['error'],
    logout: null,
    cleanError: null,
});

markActionsOffline(Creators, ['endSchedulingRequest']);

export const SchedulingTypes = Types;
export default Creators;

const INITIAL_STATE = {
    data: [],
    loading: false,
    error: null,
};

const listSchedulings = (state = INITIAL_STATE, action) => 
                            ({ data: action.schedulings, loading: false, error: null });

const addScheduling = (state = INITIAL_STATE, action) => 
                            ({...state, data: [...data, action.scheduling]});

const update = (state = INITIAL_STATE, action) => 
            state.data.map(scheduling => 
                        scheduling.id == action.scheduling.id
                        ? action.scheduling
                        : scheduling
                    );

const remove = (state = INITIAL_STATE, action) => ({
                    data: state.data.filter(scheduling => scheduling.id != action.scheduling.id),
                    loading: false,
                    error: null,
                });

const loadingRequest = (state = INITIAL_STATE, action) => ({...state, loading: true});

const endSchedulingRequest = (state = INITIAL_STATE, action) => ({
    data: state.data.map(scheduling => 
        scheduling.id == action.id
        ? {...scheduling, finished: true}
        : scheduling
    ),
    loading: true,
    error: null,
});

const errorSchedulings = (state = INITIAL_STATE, action) => ({...state, error: action.error, loading: false});

const cleanError = (state = INITIAL_STATE, action) => ({ ...state, error: null });

const logout = (state = INITIAL_STATE, action) => ({...state, loading: !state.loading});


export const reducer = createReducer(INITIAL_STATE, {

    [Types.LIST_SCHEDULINGS]: listSchedulings,
    [Types.ERROR]: errorSchedulings,
    [Types.SCHEDULINGS_REQUEST]: loadingRequest,
    [Types.END_SCHEDULING_REQUEST]: endSchedulingRequest,
    [Types.ADD_SCHEDULING]: addScheduling,
    [Types.UPDATE_SCHEDULING]: update,
    [Types.END_SCHEDULING]: remove,
    [Types.LOGOUT]: logout,
});

