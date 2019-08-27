import { call, put } from 'redux-saga/effects';
import api from '../services/api';
import { SchedulingTypes } from '../store/ducks/schedulings';
import { END_SCHEDULING_URL } from '../config';

export function* endScheduling(action){
    try{

        const response = yield call(api.post, END_SCHEDULING_URL(action.id));

        yield put({ type: SchedulingTypes.END_SCHEDULING, id: response.data.id });

    }catch(err){

        yield put({ type: SchedulingTypes.ERROR, error: err });

    }
}