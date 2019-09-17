import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FriendMap from './components/FriendMap';
// import store from './utilities/Store';


export default class App extends Component {

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // async componentDidMount() {
  //   this.storeSubscriber = function (changes, store) {
  //     console.log("I am the App. I see that this happend in store", changes);
  //   }
  //   store.subscribeToChanges(this.storeSubscriber)
  //   let co = 1;
  //   while(true){
  //     await this.sleep(1000);
  //     store.setState({counter: co});
  //     co++;
  //   }
  // }



  render() {
    return (
      <div className="App">
        <FriendMap className="col-10 offset-1"/>
      </div>
    );
  }

}


