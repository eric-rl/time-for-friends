import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import FriendMap from './components/FriendMap';
import Friends from './containers/Friends';
import AddFriends from './containers/AddFriend';
import Navigation from './components/Navigationbar';
import NavigationMobile from './components/NavigationbarMobile'
import FriendDetails from './containers/FriendDetails';
import Register from './containers/Register';
import Login from './containers/Login';
import PrivateRoutes from './utilities/PrivateRoutes';
import { Store } from './utilities/Store';


export default function App() {
  const { state, dispatch } = React.useContext(Store);
  const [haveLookedForData, sethaveLookedForData] = useState(false)


  // const fetchDataAction = async () => {
  //   const data = await fetch("/api/created-by/" + state.currentUser.id);
  //   const dataJSON = await data.json();
  //   sethaveLookedForData(true)
  //   dispatch({
  //     type: 'FETCH_DATA',
  //     payload: dataJSON
  //   });
  // };



  // useEffect(() => {
  //   console.log(haveLookedForData);
  //   !haveLookedForData && fetchDataAction();
  // });


  return (
    <Router>
      <div className="App">
        <Navigation />
        <NavigationMobile />
        <PrivateRoutes exact path="/" component={FriendMap} isAuthenticated={state.isLoggedIn} redirectPath="/login" />
        <PrivateRoutes exact path="/friends" component={Friends} isAuthenticated={state.isLoggedIn} redirectPath="/login" />
        <PrivateRoutes path="/add-friend" component={AddFriends} isAuthenticated={state.isLoggedIn} redirectPath="/login" />
        <PrivateRoutes path="/friends/:id" component={FriendDetails} redirectPath="/login" />
        <PrivateRoutes path="/register" component={Register} isAuthenticated={!state.isLoggedIn} redirectPath="/" />
        <PrivateRoutes path="/login" component={Login} isAuthenticated={!state.isLoggedIn} redirectPath="/" />
      </div>
    </Router>
  );
}



