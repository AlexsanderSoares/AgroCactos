import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
    requestSchedulings: [],
    addScheduling: ['scheduling'],
    updateScheduling: ['id'],
    removeScheduling: ['id'],
});

const INITIAL_STATE = {
    data: [],
    loading: false,
    error: null,
};

const addSchedulings = (state = INITIAL_STATE, action) => 
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

const requestSchedulings = (state = INITIAL_STATE, action) => ({...state, loading: true});

const errorSchedulings = (state = INITIAL_STATE, action) => ({...state, error: action.error});


export default createReducer(INITIAL_STATE, {

    ['ADD_SCHEDULINGS']: addSchedulings,
    ['ERROR']: errorSchedulings,
    [Types.REQUEST_SCHEDULINGS]: requestSchedulings,
    [Types.ADD_SCHEDULING]: addScheduling,
    [Types.UPDATE_SCHEDULING]: update,
    [Types.REMOVE_SCHEDULING]: remove,

});

