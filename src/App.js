import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import LoginProvider from './pages/Providers/LoginProvider';
import HomeScreen from './pages/Home';
// import SchedulingScreen from './pages/Scheduling';
// import ProfileScreen from './pages/Profile';

const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginProvider,
    navigationOptions: {
      header: null,
    }
  },
  Home: {
    screen: HomeScreen,
  },
  // Scheduling: SchedulingScreen,
  // Profile: ProfileScreen,
});

export default createAppContainer(AppNavigator);