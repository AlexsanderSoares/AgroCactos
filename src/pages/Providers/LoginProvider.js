import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '../../store';
import Login from '../Login';

export default LoginProvider = ({ navigation }) => {
    return (
        <Provider store={store}>
            <Login navigation={navigation}/>
        </Provider>
    );
};