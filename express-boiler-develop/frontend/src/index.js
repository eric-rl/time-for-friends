import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Friends from './containers/Friends';
import AddFriends from './containers/AddFriend';
import Navigation from './components/Navigationbar';
import NavigationMobile from './components/NavigationbarMobile'
import FriendDetails from './containers/FriendDetails';
import Register from './containers/Register';
import Login from './containers/Login';
import { StoreProvider } from './utilities/Store';
import PrivateRoutes from './utilities/PrivateRoutes';



const routing = (
    <StoreProvider>
        <Router>
            <div>
                <Navigation />
                <NavigationMobile />
                <PrivateRoutes exact path="/" component={App} redirectPath="/login" />

                <PrivateRoutes exact path="/friends" component={Friends} redirectPath="/login" />
                <PrivateRoutes path="/add-friend" component={AddFriends} redirectPath="/login" />
                <PrivateRoutes path="/friends/:id" component={FriendDetails} redirectPath="/login"/>
                <Route path="/register" component={Register}></Route>
                <Route path="/login" component={Login}></Route>
            </div>
        </Router>
    </StoreProvider>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
