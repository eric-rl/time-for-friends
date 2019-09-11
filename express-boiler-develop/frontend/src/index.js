import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Friends from './containers/Friends';
import AddFriends from './containers/AddFriend'
import Navigation from './components/Navigationbar'


const routing = (
    <Router>
        <div>
            <Navigation />
            <Route exact path="/" component={App} />
            <Route path="/friends" component={Friends} />
            <Route path="/add-friend" component={AddFriends} />
        </div>

    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
