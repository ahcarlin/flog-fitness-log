import React from 'react';
import Colors from '../constants/Colors'
import { View, StyleSheet, Alert, AsyncStorage } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button, Header } from 'react-native-elements'
import { connect } from 'react-redux';
import { getUser } from '../redux/reducer'
import MyBackButton from '../components/MyBackButton'
import { _signIn } from './SignInScreen'
import Keys from '../constants/Keys'

export default function SignUpScreen(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const _signUp = () => {
        fetch(`${Keys.userUrl}/signup`, {
          method: 'POST',
          body: JSON.stringify({"email": email, "password": password, "bodyweight":150}),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(resp => {
          return resp.ok ? resp.json() : resp.statusText
        })
        .then(resp => {
          console.log(resp)
          if (resp == undefined ) {
            setError("Something ain't quite right. Try that one again.")
            throw new Error("bad")
          } else {
            Alert.alert("You've been registered!", "Welcome to Flog.", [
              {text: "Let's go", onPress: () => _signIn()}
            ])
          }
        })
        .catch(err => console.log(err))
      }

      _signIn = () => {
        fetch(`${Keys.userUrl}/signin`, {
          method: 'POST',
          body: JSON.stringify({"email": email, "password": password}),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(resp => {
          return resp.ok ? resp.json() : console.log(resp.statusText)
        })
        .then(resp => {
          if (resp == undefined) {
            setError('Incorrect username or password')
            throw new Error("thrown")
          } else {
            AsyncStorage.setItem("userToken", resp.token)
          }
        })
        .then(() => getUser(email))
        .then(() => props.navigation.navigate('Main'))
        .catch(err => console.log(err))
      }

      return (
        <View style={{flex: 1}}>
        <Header leftComponent={<MyBackButton/>} centerComponent={{ text: 'Sign Up', style: { color: '#fff' } }} />
          <View style={{flex: 1, alignItems: 'center'}}>
            <FormLabel>EMAIL</FormLabel>  
            <FormInput inputStyle={styles.input} value={email} textContentType={'emailAddress'} 
              textAlign={'center'} onChangeText={(email) => setEmail(email)}
            />
            <FormLabel>PASSWORD</FormLabel>
            <FormInput inputStyle={styles.input} value={password} textContentType={'password'} 
              textAlign={'center'} secureTextEntry={true} onChangeText={(password) => setPassword(password)}
            />
            <FormValidationMessage>{error}</FormValidationMessage>
            <Button title={"SIGN ME UP!"} buttonStyle={styles.upButton} onPress={_signUp}></Button>
          </View>
        </View>
      );
}

SignUpScreen.navigationOptions = {
    header: null
}

const styles = StyleSheet.create({
    input: {
      width: 250,
      backgroundColor: '#fff',
      borderBottomColor: '#bbb',
      borderBottomWidth: 2
    },
    upButton: {
      backgroundColor: Colors.signButton,
      top: 16,
      borderColor: 'transparent',
      borderRadius: 3,
    }
  });