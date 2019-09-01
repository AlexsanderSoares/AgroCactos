import { call, put } from 'redux-saga/effects';
import api from '../services/api';
import { SchedulingTypes } from '../store/ducks/schedulings';
import { LIST_SCHEDULINGS_URL } from '../config';

export function* listSchedulings(){
    try{

        const response = yield call(api.get, LIST_SCHEDULINGS_URL());

        yield put({ type: SchedulingTypes.LIST_SCHEDULINGS, schedulings: response.data.schedulings });

    }catch(err){

        yield put({ 
            type: SchedulingTypes.ERROR_LIST_SCHEDULINGS,
            message: "Não foi possível listar os agendamentos.",
         });

    }
}