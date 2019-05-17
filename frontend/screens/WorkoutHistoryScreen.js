import React from 'react'
import { connect } from 'react-redux'
import { View, FlatList, Text, RefreshControl } from 'react-native'
import { withNavigationFocus } from 'react-navigation'
import { ListItem, Header } from 'react-native-elements'
import SignOutIcon from '../components/SignOutIcon'
import { getUser } from '../redux/reducer'

class WorkoutHistoryScreen extends React.Component {
  
  static navigationOptions = {
    header: null
  }

  state = {
    myWorkouts: [],
    refreshing: false
  }

  componentDidMount() {
    // this.myWorkoutDates()
    // this.render()
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.props.getUser().then(() => {
      this.setState({refreshing: false});
    });
  }


  myWorkoutDates = () => {
    let wos = this.props.workouts 
    return wos.map(wo => {
      var oneWo = {}
      oneWo.workoutDate = wo["date"]
      var woArr = []
      wo["exercisesToday"].forEach( eT => {
        woArr.push(eT["exercise"])
        oneWo.exercises = woArr
      })
      woArr.join("  ")
      return (oneWo)
    });
    // console.log(this.state.myWorkouts)
  }


  keyExtractor = (item, index) => index.toString()


  renderItem = ({item}) => (
    <ListItem
      title={<Text>{item.exercises}</Text>}
      subtitle={<Text>{item.workoutDate.slice(0,10)}</Text>}
    />
  )
  
  render () {
    // {this.props.isFocused ? this.props.getUser() : null}
    return (
      <View style={{flex: 1}}>
        <Header centerComponent={{ text: 'Workout History', style: { color: '#fff' } }} rightComponent={<SignOutIcon />}/>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              />
            }
          keyExtractor={this.keyExtractor}
          data={this.myWorkoutDates()}
          renderItem={this.renderItem}
        >
        </FlatList>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {workouts: state.user.workouts, workoutDates: state.user.workouts.date}
}

export default connect(mapStateToProps, {getUser})(withNavigationFocus(WorkoutHistoryScreen))