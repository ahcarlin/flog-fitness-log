import React from 'react'
import { AsyncStorage } from 'react-native'
import { withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements'

class SignOutIcon extends React.Component {
  _signOutAsync = async () => {
    try {
      await AsyncStorage.removeItem("userToken")
      this.props.navigation.navigate("Auth")
    } catch(exception) {
      console.log(exception)
    }
  }

  render() {
    return (
      <Icon name='sign-out' type='font-awesome' color='#fff' onPress={this._signOutAsync}/>
    )
  }
}

export default withNavigation(SignOutIcon)