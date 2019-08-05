import { all, spawn, takeLatest, takeEvery } from 'redux-saga/effects';
import { listSchedulings } from './listSchedulings';
import { endScheduling } from './endScheduling';
import { logout } from './logout';

import { startWatchingNetworkConnectivity } from './offline';

export default function* root(){
    yield all([
        // spawn(startWatchingNetworkConnectivity),
        takeEvery('END_SCHEDULING', endScheduling),
        takeLatest('REQUEST_SCHEDULINGS', listSchedulings),
        takeLatest('LOGOUT', logout),
    ]);
}