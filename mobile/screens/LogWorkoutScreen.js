import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Button, Header } from 'react-native-elements';
import { useSelector } from 'react-redux';
import SignOutIcon from '../components/SignOutIcon'
import { parseWorkout } from '../constants/DSL'
import Keys from '../constants/Keys'
import { getUser } from '../redux/reducer'

export default function LogWorkoutScreen(props) {
    const [date, setDate] = useState(null);
    const [log, setLog] = useState('');
    const [width, setWidth] = useState('99%');
    const [bodyweight, setBodyweight] = useState(useSelector(state => state.bodyweight));
    const [isMetric, setIsMetric] = useState(useSelector(state => state.isMetric));
    const email = useSelector(state => state.email);

    useEffect( () => {
        /* Evidently, resizing triggers something that makes copy-paste work.
         * Timeout is mandatory for this hack, doesn't work otherwise.
         */
        setTimeout(() => {setWidth('100%')}, 100);
        setDate();
    });

    const setDate = () => {
        let newDate = new Date;
        let currentDate = newDate.toDateString();
        setDate(currentDate);
    }

    const _handleSubmit = () => {
        let exercisesToday = parseWorkout(log)
        let newWorkout = {
          bodyweightToday: bodyweight,
          date: date,
          exercisesToday: exercisesToday
        }
        fetch(`${Keys.userUrl}/log`, {
          method: 'PATCH',
          body: JSON.stringify({email: email, workout: newWorkout }),
          headers: {
            'Content-Type':'application/json'
          }
        })
        .then(resp => {
          return resp.ok ? resp.json() : console.log(resp.statusText)
        })
        .then(() => getUser(email))
        .then(() => Alert.alert("Workout logged!", "Another one in the books.", [
          {text: "Right on", onPress: () => console.log("OK")}
        ]))
        .catch((err) => console.log(err))
      }
      
      return (
        <View style={{flex: 1}}>
        <Header 
        centerComponent={{ text: 'Log Workout', style: { color: '#fff' } }}
        rightComponent={<SignOutIcon />}
        />
        <View style={{flex: 1, padding: 6}}>
          <Text style={{fontSize: 12}}>Bodyweight {isMetric ? '(kg)' : '(lbs)'}</Text>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: "space-between"}}>
            <TextInput style={styles.bodyWeightInput} value={bodyweight.toString()}
              maxLength={3} onChangeText={(bodyweight) => setBodyweight(bodyweight)}/>
            <Button title={"Log It!"} buttonStyle={styles.logButton} onPress={_handleSubmit}/>
          </View>
          <TextInput style={
            { width: state.testWidth,
              padding: 4,
              height: 400,
              borderColor: 'lightgrey',
              borderWidth: 2,
              textAlignVertical: 'top'
            }
          }
            multiline={true}
            placeholder="Start logging!"
            onChangeText={(log) => setLog(log)} />
        </View>
        </View>
      )

}

LogWorkoutScreen.navigationOptions = {
    header: null
}