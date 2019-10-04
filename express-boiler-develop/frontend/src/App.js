import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import FriendMap from './components/FriendMap';
import Friends from './containers/Friends';
import AddFriend from './containers/AddFriend';
import Navigation from './components/Navigationbar';
import NavigationMobile from './components/NavigationbarMobile'
import FriendDetails from './containers/FriendDetails';
import Register from './containers/Register';
import Login from './containers/Login';
import Loading from './containers/Loading.js'
import PrivateRoutes from './utilities/PrivateRoutes';
import { Store } from './utilities/Store';


export default function App() {
  const { state, dispatch } = React.useContext(Store);


  useEffect(() => {
    checkLoginStatus()
  });

  const checkLoginStatus = async () => {
    let data = await fetch("/api/loggedinas");
    try {
      data = await data.json();
    } catch {
    }
    if (data.loggedIn && state.isLoggedIn === false) {
      dispatch({
        type: 'SET_LOGGEDIN',
      })
      dispatch({
        type: 'FETCH_CURRENT_USER',
        payload: data
      })
    } else if (!data.loggedIn && state.isLoggedIn === true) {
      dispatch({
        type: 'LOGOUT_USER'
      })
    }
  }

  return (
    <Router>
      <div className="App">
        <Navigation />
        <NavigationMobile />
        <PrivateRoutes exact path="/" component={FriendMap} isAuthenticated={state.isLoggedIn} redirectPath="/login" />
        <PrivateRoutes exact path="/friends" component={Friends} isAuthenticated={state.isLoggedIn} redirectPath="/login" />
        <PrivateRoutes path="/add-friend" component={AddFriend} isAuthenticated={state.isLoggedIn} redirectPath="/login" />
        <PrivateRoutes path="/friend/:id" component={FriendDetails} isAuthenticated={state.isLoggedIn} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        {/* <Route path="/loading" component={Loading} /> */}
      </div>
    </Router>
  );
}



