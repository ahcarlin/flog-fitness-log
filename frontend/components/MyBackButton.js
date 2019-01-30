import React from 'react'
import { Icon } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

class MyBackButton extends React.Component {

  backButton = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <Icon name='arrow-left' type='font-awesome' color='#fff' onPress={this.backButton}/>
    )
  }
}

export default withNavigation(MyBackButton)