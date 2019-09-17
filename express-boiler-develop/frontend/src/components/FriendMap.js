import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react';

class FriendMap extends Component {

    render() {
        const mapStyles = {
            width: '84%',
            height: '69%',
            marginLeft: 'auto',
            marginRight: 'auto',
        };
        const mapOptions = {
            mapTypeId: 'satellite   '
        }
        return (
            <div className="map-container">
                <Map className="map-map"
                    google={this.props.google}
                    zoom={2}
                    style={mapStyles}
                    initialCenter={{ lat: 20.00, lng: 0.00 }}
                    // disableDefaultUI= {true}
                    mapTypeId={'satellite'}
                />
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDsD9xKhLIEIGRR1NgmR5VZVZ5nyOOsuik"
})(FriendMap);
    