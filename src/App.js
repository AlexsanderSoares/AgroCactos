import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from './pages/Login';
// import HomeScreen from './pages/Home';
// import SchedulingScreen from './pages/Scheduling';
// import ProfileScreen from './pages/Profile';

const AppNavigator = createStackNavigator({
  Login: LoginScreen,
  // Home: HomeScreen,
  // Scheduling: SchedulingScreen,
  // Profile: ProfileScreen,
});

export default createAppContainer(AppNavigator);