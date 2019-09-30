import React from 'react'

export const Store = React.createContext();
const isEmpty = require("is-empty");
const initialState = {
    friends: [],
   
}

const loginState = {
    user: {},
    loading: false,
    isAuthenticated: false,
}

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_DATA':
            return { ...state, friends: action.payload };
        default:
            return state;
    }
}
export default function(state = loginState, action) {
    switch (action.type) {
      case "SET_CURRENT_USER":
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          user: action.payload
        };
      case "USER_LOADING":
        return {
          ...state,
          loading: true
        };
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