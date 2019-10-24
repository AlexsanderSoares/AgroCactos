import { take, put } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import NetInfo from "@react-native-community/netinfo";
import { OFFLINE, ONLINE } from 'redux-offline-queue';

export function* offlineBackground(){

    try{

        while(true){

            const statusConection = yield NetInfo.fetch();

            if(statusConection.isInternetReachable)
                yield put({ type: ONLINE });
            else
                yield put({ type: OFFLINE });

        }

    }finally{

        channel.close();

    }

}
