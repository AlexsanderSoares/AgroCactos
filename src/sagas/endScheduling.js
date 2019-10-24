import { call, put } from 'redux-saga/effects';
import api from '../services/api';
import { SchedulingTypes } from '../store/ducks/schedulings';
import { END_SCHEDULING_URL } from '../config';
import { AsyncStorage, Alert } from 'react-native';

export function* endScheduling(action){
    try{

        const response = yield call(api.post, END_SCHEDULING_URL(action.id));

        yield put({ type: SchedulingTypes.END_SCHEDULING, id: action.id });

    }catch(err){

        if(err.status == 401){

            const keys = ['@AgroCactos:expires', '@AgroCactos:acess_token', '@AgroCactos:user'];
            
            yield call(AsyncStorage.multiRemove, [keys, function*(err) {
                if(err)
                    console.log(err);
            }]);

        }

        Alert.alert("Erro", "Não foi possível finalizar o agendamento.");

        yield put({ 
            type: SchedulingTypes.ERROR_END_SCHEDULING, 
            id: action.id, 
            message: "Não foi possível finalizar o agendamento.", 
        });

    }
}