import { take, call, put } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { OFFLINE, ONLINE } from 'redux-offline-queue';

export function* offlineBackground(){

    try{

            yield put({ type: ONLINE });
            
    }finally{

        console.log('BackgroundTask Finalizada');

    }

}
