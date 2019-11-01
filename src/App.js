import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import BackgroundTask from 'react-native-background-task';
import NetInfo from "@react-native-community/netinfo";

import { store, persistor } from './store';
import { offlineBackground } from './sagas/offlineBackground';

import LoginProvider from './pages/Providers/LoginProvider';
import HomeScreen from './pages/Providers/HomeProvider';
import SchedulingScreen from './pages/Providers/SchedulingProvider';
import ProfileScreen from './pages/Profile';
import Creators from './store/ducks/schedulings';

import ProfileButtonComponent from './pages/components/profileButtonComponent';
import LogoutButtonComponent from './pages/components/logoutButtonComponent';

BackgroundTask.define( async () => {

    const statusConection = await NetInfo.fetch();

    console.log(statusConection);

    if(statusConection.isConnected)
        Creators.isConnected();

    console.log("Background executada!");

    BackgroundTask.finish();
});

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
  Profile:{
    screen: ProfileScreen,
    navigationOptions: {
      title: "Perfil",
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#679436',
      },
      headerRight: (
        <LogoutButtonComponent/>
      ),
    }
  },
}));

class App extends Component{

  componentDidMount(){
      BackgroundTask.schedule({ period: 600 });
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