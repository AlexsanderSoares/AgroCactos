import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
// import { TouchableOpacity, Text } from 'react-native';
// import { Icon } from 'react-native-elements';
import BackgroundTask from 'react-native-background-task';
import NetInfo from '@react-native-community/netinfo';
import { OFFLINE, ONLINE } from 'redux-offline-queue';

import { store, persistor } from './store';
import LoginProvider from './pages/Providers/LoginProvider';
import HomeScreen from './pages/Providers/HomeProvider';
import SchedulingScreen from './pages/Providers/SchedulingProvider';
// import ProfileScreen from './pages/Profile';
import { startWatchingNetworkConnectivity } from './sagas/offline';


BackgroundTask.define(async () => {

  startWatchingNetworkConnectivity();

  BackgroundTask.finish();

});


import ProfileButtonComponent from './pages/components/profileButtonComponent';

const AppNavigator = createAppContainer(createStackNavigator({
  Login: {
    screen: LoginProvider,
    navigationOptions: {
      header: null,
    }
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: "Agendamentos",
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#679436',
      },
      headerRight: (
          <ProfileButtonComponent/>
      ),
    }
  },
  Scheduling: {
    screen: SchedulingScreen,
  },
  // Profile: ProfileScreen,
}));

class App extends Component{

  componentDidMount(){
      BackgroundTask.schedule({ period: 300 });
  }

  render() {
    return(
      <Provider store={store}>
          <AppNavigator/>
      </Provider>
    );
  }
}



export default App;