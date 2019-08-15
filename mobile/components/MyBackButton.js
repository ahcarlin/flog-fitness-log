import React from 'react'
import { Icon } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

const MyBackButton = (props) => {
    
    const backButton = () => {
        props.navigation.goBack();
    }

    return (
        <Icon name='arrow-left' type='font-awesome' color='#fff' onPress={backButton}/>
    )
}

export default withNavigation(MyBackButton)