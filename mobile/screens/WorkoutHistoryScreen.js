import React from 'react'
import { connect, useSelector } from 'react-redux'
import { View, FlatList, Text, RefreshControl } from 'react-native'
import { withNavigationFocus } from 'react-navigation'
import { ListItem, Header } from 'react-native-elements'
import SignOutIcon from '../components/SignOutIcon'
import { getUser } from '../redux/reducer'

export default function WorkoutHistoryScreen() {

  const [myWorkouts, setWorkouts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const workouts = useSelector(state => state.user.workouts);

//   useEffect( () => {
//     myWorkoutDates()
//   })

  const _onRefresh = () => {
    setRefreshing(true);
    getUser().then(() => {
      this.setRefreshing(false);
    });
  }

  const myWorkoutDates = () => {
    let wos = workouts;
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


  const keyExtractor = (item, index) => index.toString();


  const renderItem = ({item}) => (
    <ListItem
      title={<Text>{item.exercises}</Text>}
      subtitle={<Text>{item.workoutDate.slice(0,10)}</Text>}
    />
  )
  

    // {this.props.isFocused ? this.props.getUser() : null}
    return (
      <View style={{flex: 1}}>
        <Header centerComponent={{ text: 'Workout History', style: { color: '#fff' } }} rightComponent={<SignOutIcon />}/>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={_onRefresh}
              />
            }
          keyExtractor={keyExtractor}
          data={myWorkoutDates()}
          renderItem={renderItem}
        >
        </FlatList>
      </View>
    )
}

WorkoutHistoryScreen.navigationOptions = {
    header: null
  }