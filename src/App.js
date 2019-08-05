import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';

import { store, persistor } from './store';
import LoginProvider from './pages/Providers/LoginProvider';
import HomeScreen from './pages/Providers/HomeProvider';
// import SchedulingScreen from './pages/Scheduling';
// import ProfileScreen from './pages/Profile';

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
      title: "Inicio",
      headerTintColor: '#fff',
      headerStyle: {
        fontWeight: 'bold',
      },
      headerStyle: {
        backgroundColor: '#679436',
      },
      headerRight: (
          <ProfileButtonComponent/>
      ),
    }
  },
  // Scheduling: SchedulingScreen,
  // Profile: ProfileScreen,
}));

class App extends Component{
  render() {
    return(
      <Provider store={store}>
          <AppNavigator/>
      </Provider>
    );
  }
}



export default App;