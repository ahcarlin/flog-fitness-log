import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Keys from '../constants/Keys';
import reducer from '../redux/reducer';

import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen'

const store = createStore(reducer, null, applyMiddleware(thunk))

const AuthStack =  createStackNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen
})

const App = createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  AuthLoading: AuthLoadingScreen,
  Main: MainTabNavigator,
  Auth: AuthStack
},
{ initialRouteName: 'AuthLoading' }
));


export default class AppNavigator extends React.Component {
  render() {
    return (
    <Provider store={store}>
      <App  />
    </Provider>
    )
  }
}