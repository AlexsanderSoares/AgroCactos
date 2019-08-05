import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '../../store';
import Home from '../Home';

export default HomeProvider = ({ navigation }) => {
    return (
        <Provider store={store}>
            <Home navigation={navigation}/>
        </Provider>
    );
};