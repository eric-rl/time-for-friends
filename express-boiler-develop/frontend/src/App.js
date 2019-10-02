import React from 'react';
import './App.css';
import FriendMap from './components/FriendMap';
import { Store } from './utilities/Store';


export default function App() {
  const { state, dispatch } = React.useContext(Store);
  let haveTriedToGetData = false

  const fetchDataAction = async () => {
    console.log(state.currentUser.id)
    const data = await fetch("/api/created-by/" + state.currentUser.id);
    const dataJSON = await data.json();
    haveTriedToGetData = true
    console.log(haveTriedToGetData)

    dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON
    });
  };



  React.useEffect(() => {
    if(!haveTriedToGetData){
      state.friends.length === 0 && fetchDataAction();
      console.log("useEffect", haveTriedToGetData)
      console.log("useEffect", state.currentUser);
    }
  });


  return (
    <div className="App">
      {/* {console.log(state)} */}
      <FriendMap className="col-10 offset-1" />
    </div>
  );
}


