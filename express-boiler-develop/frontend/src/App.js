import React, { useState, useEffect } from 'react';
import './App.css';
import FriendMap from './components/FriendMap';
import { Store } from './utilities/Store';


export default function App() {
  const { state, dispatch } = React.useContext(Store);
  const [haveLookedForData, sethaveLookedForData] = useState(false)


  const fetchDataAction = async () => {
    const data = await fetch("/api/created-by/" + state.currentUser.id);
    const dataJSON = await data.json();
    sethaveLookedForData(true)
    dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON
    });
  };



  useEffect(() => {
    // console.log(haveLookedForData);
    !haveLookedForData && fetchDataAction();
  });


  return (
    <div className="App">
      {/* {console.log(state)} */}
      <FriendMap className="col-10 offset-1" />
    </div>
  );
}


