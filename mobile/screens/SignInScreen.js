import React, { useState } from 'react';
import Colors from '../constants/Colors'
import { AsyncStorage, View, StyleSheet } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button, Header } from 'react-native-elements';
import Keys from "../constants/Keys"


export default function SignInScreen(props) {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    
    const _signIn = () => {
      fetch(`${Keys.userUrl}/signin`, {
        method: 'POST',
        body: JSON.stringify({"email": email, "password": password}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(resp => {
        return resp.ok ? resp.json() : resp.statusText;
      })
      .then(resp => {
        if (resp === "Unauthorized") {
          setError('Incorrect username or password');
        } else {
          AsyncStorage.setItem("userToken", resp.token);
          props.navigation.navigate('Main');
        }
      })
      .catch(err => console.log(err))
    }

    const navigateToSignUp = () => {
      props.navigation.navigate('SignUp');
    }

    return (
      //enable FVM once error handling is in place 
      <View style={{flex: 1}}>
        <Header centerComponent={{ text: 'Sign In', style: { color: '#fff' } }}/>
          <View style={{alignItems: 'center'}}>
            <FormLabel>EMAIL</FormLabel>  
            <FormInput inputStyle={styles.input} value={email} textContentType={'emailAddress'} textAlign={'center'} onChangeText={(e) => setEmail(e)}/>
            <FormLabel>PASSWORD</FormLabel>
            <FormInput inputStyle={styles.input} value={password} textContentType={'password'} textAlign={'center'} secureTextEntry={true} onChangeText={(p) => setPassword(p)}/>
            <FormValidationMessage>{error}</FormValidationMessage>
          </View>
        <Button title={"Sign In"} buttonStyle={styles.inButton} onPress={_signIn}></Button>
        <Button title="Click here to sign up!" buttonStyle={styles.upButton} onPress={navigateToSignUp}></Button>
      </View>
    );
    
}

const styles = StyleSheet.create({
    input: {
      width: 200,
      backgroundColor: '#fff',
      borderBottomColor: '#bbb',
      borderBottomWidth: 2
    },
    inButton: {
      backgroundColor: '#6b1596',
      top: 16,
      borderColor: 'transparent',
      borderRadius: 3,
    },
    upButton: {
      top: 20,
      backgroundColor: Colors.tintColor,
      borderColor: 'transparent',
      borderRadius: 3,
    }
  });