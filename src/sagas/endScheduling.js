import { call, put } from 'redux-saga/effects';
import api from '../services/api';
import { SchedulingTypes } from '../store/ducks/schedulings';

export function* getSchedulings(action){
    try{

        const response = yield call(api.get, ``);

        yield put({ type: SchedulingTypes.END_SCHEDULING, id: response.data.id });

    }catch(err){

        yield put({ type: SchedulingTypes.ERROR, error: err });

    }
}