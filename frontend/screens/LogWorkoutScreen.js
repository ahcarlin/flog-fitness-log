import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Button, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import SignOutIcon from '../components/SignOutIcon'
import { parseWorkout } from '../constants/DSL'
import Keys from '../constants/Keys'
import { getUser } from '../redux/reducer'


class LogWorkoutScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    bodyweight: this.props.bodyweight,
    log: '',
    testWidth: '99%',
    date: null,
    isMetric: this.props.isMetric
  }

  componentDidMount () {
    /* Evidently, resizing triggers something that makes copy-paste work.
     * Timeout is mandatory for this hack, doesn't work otherwise.
     */
    setTimeout(() => {
      this.setState({testWidth: '100%'})
    }, 100);
    this.setDate()
  }

  setDate = () => {
    let newDate = new Date
    let currentDate = newDate.toDateString()
    this.setState({date: currentDate})
  }

  _handleSubmit = () => {
    let exercisesToday = parseWorkout(this.state.log)
    let newWorkout = {
      bodyweightToday: this.state.bodyweight,
      date: this.state.date,
      exercisesToday: exercisesToday
    }
    fetch(`${Keys.userUrl}/log`, {
      method: 'PATCH',
      body: JSON.stringify({email: this.props.email, workout: newWorkout }),
      headers: {
        'Content-Type':'application/json'
      }
    })
    .then(resp => {
      return resp.ok ? resp.json() : console.log(resp.statusText)
    })
    .then(() => this.props.getUser(this.props.email))
    .then(() => Alert.alert("Workout logged!", "Another one in the books.", [
      {text: "Right on", onPress: () => console.log("OK")}
    ]))
    .catch((err) => console.log(err))
  }


  //TODO 3: get onPress submitting to backend
  render() {
    return (
      <View style={{flex: 1}}>
      <Header 
      centerComponent={{ text: 'Log Workout', style: { color: '#fff' } }}
      rightComponent={<SignOutIcon />}
      />
      <View style={{flex: 1, padding: 6}}>
        <Text style={{fontSize: 12}}>Bodyweight {this.state.isMetric ? '(kg)' : '(lbs)'}</Text>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: "space-between"}}>
          <TextInput style={styles.bodyWeightInput} value={this.props.bodyweight.toString()}
            maxLength={3} onChangeText={(bodyweight) => this.setState({bodyweight})}/>
          <Button title={"Log It!"} buttonStyle={styles.logButton} onPress={this._handleSubmit}/>
        </View>
        <TextInput style={
          { width: this.state.testWidth,
            padding: 4,
            height: 400,
            borderColor: 'lightgrey',
            borderWidth: 2,
            textAlignVertical: 'top'
          }
        }
          multiline={true}
          placeholder="Start logging!"
          onChangeText={(log) => this.setState({log})}
          keyboardType={this.state.keyboard} />
          </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  bodyweight: state.user.bodyweight,
  isMetric: state.user.isMetric,
  email: state.user.email
})

export default connect(mapStateToProps, {getUser})(LogWorkoutScreen)

const styles = StyleSheet.create({
  bodyWeightInput: {
    width: 66,
    maxHeight: 33,
    borderColor: 'lightgrey',
    borderWidth: 2,
    marginBottom: 5, 
  },
  logButton: {
    backgroundColor: '#ffb042',
    bottom: 9,
    height: 40,
    borderColor: 'transparent',
    borderRadius: 3
  }
})