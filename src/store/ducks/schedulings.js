import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
    addSchedulings: ['schedulings'],
    addScheduling: ['scheduling'],
    updateScheduling: ['id'],
    removeScheduling: ['id'],
});

const INITIAL_STATE = [];

const addSchedulings = (state = INITIAL_STATE, action) => action.schedulings;

const addScheduling = (state = INITIAL_STATE, action) => [...state, action.scheduling];

const update = (state = INITIAL_STATE, action) => 
            state.map(scheduling => 
                        scheduling.id == action.scheduling.id
                        ? {...scheduling, finished: !scheduling.finished}
                        : scheduling
                    );

const remove = (state = INITIAL_STATE, action) => 
                state.filter(scheduling => scheduling.id != action.scheduling.id);


export default createReducer(INITIAL_STATE, {
    [Types.ADD_SCHEDULINGS]: addSchedulings,
    [Types.ADD_SCHEDULING]: addScheduling,
    [Types.UPDATE_SCHEDULING]: update,
    [Types.REMOVE_SCHEDULING]: remove,
});

