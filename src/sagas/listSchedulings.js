import { call, put } from 'redux-saga/effects';
import api from '../services/api';
import { SchedulingTypes } from '../store/ducks/schedulings';

export function* listSchedulings(){
    try{

        const response = yield call(api.get, '');

        yield put({ type: SchedulingTypes.LIST_SCHEDULINGS, schedulings: response.data.schedulings });

    }catch(err){

        yield put({ type: SchedulingTypes.ERROR, error: err });

    }
}