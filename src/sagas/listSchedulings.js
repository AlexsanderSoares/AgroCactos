import { call, put } from 'redux-saga/effects';
import api from '../services/api';
import { SchedulingTypes } from '../store/ducks/schedulings';
import { LIST_SCHEDULINGS_URL } from '../config';
import { AsyncStorage, Alert } from 'react-native';

export function* listSchedulings(){
    try{

        const response = yield call(api.get, LIST_SCHEDULINGS_URL());

        yield put({ type: SchedulingTypes.LIST_SCHEDULINGS, schedulings: response.data.schedulings });

    }catch(err){

        console.log(err);

        if(err.status == 401){

            const keys = ['@AgroCactos:expires', '@AgroCactos:acess_token', '@AgroCactos:user'];
            
            yield call(AsyncStorage.multiRemove, keys, function(err){});

        }

        Alert.alert("Erro", "Não foi possível listar os agendamentos.");

        yield put({ 
            type: SchedulingTypes.ERROR_LIST_SCHEDULINGS,
            message: "Não foi possível listar os agendamentos.",
         });

    }
}