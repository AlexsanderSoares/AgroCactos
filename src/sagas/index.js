import { takeLatest, put } from 'redux-saga/effects';
import api from '../services/api';

function* getSchedulings(){
    try{

        const response = yield call(api.get, '');

        yield put({ type: 'ADD_SCHEDULINGS', schedulings: response.data.schedulings });

    }catch(err){

        yield put({ type: 'ERROR', error: err });

    }
}

export default function* root(){
    yield[
        takeLatest('REQUEST_SCHEDULINGS', getSchedulings),
    ];
}