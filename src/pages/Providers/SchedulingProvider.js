import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { store, persistor } from '../../store';
import EndSchedulingButton from '../components/endSchedulingButton';
import Scheduling from '../Scheduling';


export default class SchedulingProvider extends Component{
    static navigationOptions = ({ navigation }) => ({
        title: "Agendamento",
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#679436',
        },
        headerRight: (
            <EndSchedulingButton navigation={navigation} idScheduling={navigation.getParam('scheduling', {}).id}/>
        ),
      });

    render(){
        return (
            <Provider store={store}>
                <Scheduling navigation={this.props.navigation} />
            </Provider>
        );
    }
};