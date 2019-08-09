import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

export default function AuthLoadingScreen(props) {


    useEffect( () => {
        const userToken = async() => {
          await AsyncStorage.getItem('userToken');
        }

        props.navigation.navigate(userToken ? 'Main' : 'Auth');
    });
    return (
        <View style={{flex: 1}}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
}