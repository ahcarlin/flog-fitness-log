import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import WorkoutHistoryScreen from '../screens/WorkoutHistoryScreen';
import LogWorkoutScreen from '../screens/LogWorkoutScreen'
import SettingsScreen from '../screens/SettingsScreen'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const LogWorkoutStack = createStackNavigator({
  LogWorkout: LogWorkoutScreen,
});

LogWorkoutStack.navigationOptions = {
  tabBarLabel: 'Log Workout',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-create'}
    />
  ),
};

const WorkoutHistoryStack = createStackNavigator({
  WorkoutHistory: WorkoutHistoryScreen,
})

WorkoutHistoryStack.navigationOptions = {
  tabBarLabel: 'History',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-book'}
    />
  ),
};



export default createBottomTabNavigator({
  HomeStack,
  LogWorkoutStack,
  WorkoutHistoryStack,
});
