import React from 'react';
import Colors from '../constants/Colors'
import { View, StyleSheet, Alert, AsyncStorage } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button, Header } from 'react-native-elements'
import { connect } from 'react-redux';
import { getUser } from '../redux/reducer'
import MyBackButton from '../components/MyBackButton'
import { _signIn } from './SignInScreen'
import Keys from '../constants/Keys'

class SignUpScreen extends React.Component {

  static navigationOptions = {
    header: null
  }

  state = {
    email: '',
    password: '',
    error: null
  }

  _signUp = () => {
    fetch(`${Keys.userUrl}/signup`, {
      method: 'POST',
      body: JSON.stringify({"email": this.state.email, "password": this.state.password, "bodyweight":150}),
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
        this.setState({error: "Something ain't quite right. Try that one again."})
        throw new Error("bad")
      } else {
        Alert.alert("You've been registered!", "Welcome to Flog.", [
          {text: "Let's go", onPress: () => this._signIn()}
        ])
      }
    })
    .catch(err => console.log(err))
  }

  _signIn = () => {
    fetch(`${Keys.userUrl}/signin`, {
      method: 'POST',
      body: JSON.stringify({"email": this.state.email, "password": this.state.password}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(resp => {
      return resp.ok ? resp.json() : console.log(resp.statusText)
    })
    .then(resp => {
      if (resp == undefined) {
        this.setState({error: 'Incorrect username or password'})
        throw new Error("thrown")
      } else {
        AsyncStorage.setItem("userToken", resp.token)
      }
    })
    .then(() => this.props.getUser(this.state.email))
    .then(() => this.props.navigation.navigate('Main'))
    .catch(err => console.log(err))
  }

  render() {
    return (
      <View style={{flex: 1}}>
      <Header leftComponent={<MyBackButton/>} centerComponent={{ text: 'Sign Up', style: { color: '#fff' } }} />
        <View style={{flex: 1, alignItems: 'center'}}>
          <FormLabel>EMAIL</FormLabel>  
          <FormInput inputStyle={styles.input} value={this.state.email} textContentType={'emailAddress'} 
            textAlign={'center'} onChangeText={(email) => this.setState({email})}
          />
          <FormLabel>PASSWORD</FormLabel>
          <FormInput inputStyle={styles.input} value={this.state.password} textContentType={'password'} 
            textAlign={'center'} secureTextEntry={true} onChangeText={(password) => this.setState({password})}
          />
          <FormValidationMessage>{this.state.error}</FormValidationMessage>
          <Button title={"SIGN ME UP!"} buttonStyle={styles.upButton} onPress={this._signUp}></Button>
        </View>
      </View>
    );
  }
}

export default connect(state => ({user: state}), {getUser})(SignUpScreen)

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
