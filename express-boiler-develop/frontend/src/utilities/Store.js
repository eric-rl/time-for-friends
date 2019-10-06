import React from 'react'

export const Store = React.createContext();

const initialState = {
  friends: [],
  currentUser: '',
  isLoggedIn: false,
}

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_DATA':
      return { ...state, friends: action.payload };
    case 'FETCH_CURRENT_USER':
      return { ...state, currentUser: action.payload }
    case 'LOGOUT_USER':
      return { ...state, currentUser: null, isLoggedIn: false, friends: []}
    case 'SET_LOGGEDIN':
      return { ...state, isLoggedIn: true}  
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}
  </Store.Provider>
}