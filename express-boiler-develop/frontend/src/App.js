import React from 'react';
import './App.css';
import FriendMap from './components/FriendMap';
import { Store } from './utilities/Store';


export default function App() {
  const { state, dispatch } = React.useContext(Store);

  const fetchDataAction = async () => {
    const data = await fetch("/api/person");
    const dataJSON = await data.json();
    dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON
    });
  };

  const fetchCurrentUser = async () => {
    const data = await fetch("/api/loggedinas");
    let currentUser = null
      try {currentUser = await data.json();
      console.log(currentUser)
      } catch (err){

      }
      dispatch({
        type: 'FETCH_CURRENT_USER',
        payload: currentUser
      })
  };

  React.useEffect(() => {
    state.friends.length === 0 && fetchDataAction();
    // state.currentUser === null && fetchCurrentUser();
  });


  return (
    <div className="App">
      {/* {console.log(state)} */}
      <FriendMap className="col-10 offset-1" />
    </div>
  );
}


