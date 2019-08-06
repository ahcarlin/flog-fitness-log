import Keys from '../constants/Keys'

//Actions
const LOADING = 'frontend/redux/LOADING'
const FETCHING = 'frontend/redux/FETCHING'

//Reducer
export default function reducer(state = {
  user: {},
  loading: false
}, action = {}) {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state, loading: true
      }
    case 'FETCHING':
      return {...state, loading: false, user: action.payload }
    default:
      return state
  }
}

//Action Creators
export function loadUserOnLogin(user) {
  return { type: FETCHING, user}
}

export function userIsLoading() {
  return { type: LOADING }
}

export function getUser(email) {
  return dispatch => {
    dispatch({type: 'LOADING'})
    return fetch(`${Keys.userUrl}/mydata`, {
      method: "POST",
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({"email":email})
    })
      .then(res => res.json())
      .then(user => dispatch({type: 'FETCHING', payload: user}))

  }
}

