import { take, put } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import NetInfo from "@react-native-community/netinfo";
import { OFFLINE, ONLINE } from 'redux-offline-queue';

export function* startWatchingNetworkConnectivity(){

    const channel = eventChannel(emitter => {

        NetInfo.isConnected.addEventListener('connectionChange', emitter);

        return () => NetInfo.isConnected.removeEventListener('connectionChange', emitter);

    });


    try{

        while(true){

            const isConnected = yield take(channel);

            if(isConnected)
                yield put({ ONLINE });
            else
                yield put({ OFFLINE });

        }

    }finally{

        channel.close();

    }

}
