import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import '../css/spinner.css'
import { Store } from '../utilities/Store';

function FriendMap(props) {
    const { state } = React.useContext(Store);

    return (
        <div className="col-10 offset-1">
            <h1 className='f1 tc'>Friend Map</h1>
            <div className="map-container">
                <Map
                    className="map-map mb-5"
                    google={props.google}
                    zoom={2}
                    initialCenter={{ lat: 20, lng: 1 }}
                    disableDefaultUI={true}
                >
                    {state.friends.map(city => (
                        <Marker
                            key={state.friends.indexOf(city)}
                            title={city.name.firstName}
                            position={{
                                lat: city.location.lat,
                                lng: city.location.lng
                            }}
                        ></Marker>
                    )
                    )
                    }
                </Map>
            </div>
        </div>
    )
}
export default GoogleApiWrapper({
    apiKey: "AIzaSyDsD9xKhLIEIGRR1NgmR5VZVZ5nyOOsuik"
})(FriendMap);


