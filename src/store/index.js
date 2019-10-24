import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { offlineMiddleware, suspendSaga, consumeActionMiddleware } from 'redux-offline-queue';

import reducers from './ducks';
import rootSaga from '../sagas';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['errors'],
};

const middlewares = [];

const sagaMiddleware = createSagaMiddleware();

middlewares.push(offlineMiddleware());
middlewares.push(suspendSaga(sagaMiddleware));
middlewares.push(consumeActionMiddleware());

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export {store, persistor};



