import React  from 'react';
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
import PrivateRoutes from './utilities/PrivateRoutes';
import { Store } from './utilities/Store';


export default function App() {
  const { state } = React.useContext(Store);

  return (
    <Router>
      <div className="App">
        <Navigation />
        <NavigationMobile />
        <PrivateRoutes exact path="/" component={FriendMap} isAuthenticated={state.isLoggedIn} redirectPath="/login" />
        <PrivateRoutes exact path="/friends" component={Friends} isAuthenticated={state.isLoggedIn} redirectPath="/login" />
        <PrivateRoutes path="/add-friend" component={AddFriend} isAuthenticated={state.isLoggedIn} redirectPath="/login" />
        <PrivateRoutes path="/friend/:id" component={FriendDetails} isAuthenticated={state.isLoggedIn} />
        <PrivateRoutes path="/register" component={Register} isAuthenticated={!state.isLoggedIn} redirectPath="/" />
        <PrivateRoutes path="/login" component={Login} isAuthenticated={!state.isLoggedIn} redirectPath="/" />
        {/* <Route path="/login" component={Login} /> */}
      </div>
    </Router>
  );
}



