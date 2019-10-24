import { createActions, createReducer } from 'reduxsauce';
import { markActionsOffline } from 'redux-offline-queue';

const { Types, Creators } = createActions({
    schedulingsRequest: null,
    listSchedulings: ['schedulings'],
    addScheduling: ['scheduling'],
    updateScheduling: ['id'],
    endSchedulingRequest: ['id'],
    endScheduling: ['id'],
    errorEndScheduling: ['id'],
    errorListSchedulings: null,
});

markActionsOffline(Creators, ['endSchedulingRequest']);

export const SchedulingTypes = Types;
export default Creators;

const INITIAL_STATE = {
    data: [],
    loading: false,
    schedulingsError: [],
    schedulingsFinished: [],
};

const listSchedulings = (state = INITIAL_STATE, action) => 
                            ({ ...state, data: action.schedulings, loading: false });

const addScheduling = (state = INITIAL_STATE, action) => 
                            ({...state, data: [...data, action.scheduling]});

const update = (state = INITIAL_STATE, action) => ({
            ...state,
            data: state.data.map(scheduling => 
                        scheduling.id == action.id
                        ? action.scheduling
                        : scheduling
                    )
            });

const remove = (state = INITIAL_STATE, action) => ({
                    data: state.data.filter(scheduling => scheduling.id != action.id),
                    schedulingsError: state.schedulingsError.filter(schedulingId => schedulingId != action.id),
                    schedulingsFinished: state.schedulingsFinished.filter(schedulingId => schedulingId != action.id),
                    loading: false,
                });

const loadingRequest = (state = INITIAL_STATE, action) => ({...state, loading: true});

const endSchedulingRequest = (state = INITIAL_STATE, action) => ({
    ...state,
    schedulingsError: state.schedulingsError.filter(schedulingId => schedulingId !== action.id),
    schedulingsFinished: [...state.schedulingsFinished, action.id],
    loading: true,
});

const errorEndScheduling = (state = INITIAL_STATE, action) => ({
    ...state,
    schedulingsError: [...state.schedulingsError, action.id],
    schedulingsFinished: state.schedulingsFinished.filter(schedulingId => schedulingId != action.id),
    loading: false,
});

errorListSchedulings = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
});

export const reducer = createReducer(INITIAL_STATE, {
    [Types.LIST_SCHEDULINGS]: listSchedulings,
    [Types.ERROR_END_SCHEDULING]: errorEndScheduling,
    [Types.ERROR_LIST_SCHEDULINGS]: errorListSchedulings,
    [Types.SCHEDULINGS_REQUEST]: loadingRequest,
    [Types.END_SCHEDULING_REQUEST]: endSchedulingRequest,
    [Types.ADD_SCHEDULING]: addScheduling,
    [Types.UPDATE_SCHEDULING]: update,
    [Types.END_SCHEDULING]: remove,
});

