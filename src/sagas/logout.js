import { call, put } from 'redux-saga/effects';
import api from '../services/api';
import { SchedulingTypes } from '../store/ducks/schedulings';
import { LOGOUT_URL } from '../config';
import {AsyncStorage} from 'react-native';

export function* logout(){

    try{

        const response = yield call(api.get, LOGOUT_URL());

        if(response.ok){

            const keys = ['@AgroCactos:expires_in', '@AgroCactos:acess_token', '@AgroCactos:user'];
            
            yield call(AsyncStorage.multiRemove, [keys, function*(err) {
                if(err)
                    yield put({ type: SchedulingTypes.ERROR, error: 'Ocorreu um erro inesperado' });

                yield put({ type: SchedulingTypes.LOGOUT});
            }]);

        }else{

            yield put({ type: SchedulingTypes.ERROR, error: 'Não foi possivel efetuar o logout' });

        }


    }catch(err){
        yield put({ type: SchedulingTypes.ERROR, error: 'Não foi possivel efetuar o logout' });
    }

}