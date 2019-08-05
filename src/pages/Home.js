import React, { Component } from 'react';

import { View, Text } from 'react-native';

// import { Container } from './styles';

export default class Home extends Component {

    static navigationOptions = {
        title: "Inicio",
        headerTintColor: '#fff',
        headerStyle: {
	        backgroundColor: '#679436',
        },
    };

    render() {
        return <View><Text>Home</Text></View>;
    }
}
