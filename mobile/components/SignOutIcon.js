import React from 'react'
import { AsyncStorage } from 'react-native'
import { withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements'

const SignOutIcon = (props) => {
    const _signOutAsync = async () => {
        try{
            await AsyncStorage.removeItem("userToken");
            props.navigation.navigate("Auth")
        } catch(exception){
            console.log(exception)
        }
    }
            return (
                <Icon name="sign-out" type="font-awesome" color ="#fff" onPress={_signOutAsync} />
            )
}

export default withNavigation(SignOutIcon);
