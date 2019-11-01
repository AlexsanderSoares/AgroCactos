import { all, spawn, takeLatest, takeEvery } from 'redux-saga/effects';
import { listSchedulings } from './listSchedulings';
import { endScheduling } from './endScheduling';
import { offlineBackground } from './offlineBackground';
import { logout } from './logout';

import { startWatchingNetworkConnectivity } from './offline';

export default function* root(){
    yield all([
        spawn(startWatchingNetworkConnectivity),
        takeEvery('END_SCHEDULING_REQUEST', endScheduling),
        takeLatest('SCHEDULINGS_REQUEST', listSchedulings),
        takeLatest('LOGOUT', logout),
        takeEvery('IS_CONNECTED', offlineBackground),
    ]);
}