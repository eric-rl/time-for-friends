import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react';

class FriendMap extends Component {
    state = {
        points: {}
    }
    async componentDidMount() {
        let points = await (await fetch("https://maps.googleapis.com/maps/api/geocode/json?address=London&key=AIzaSyB4pPsphC1Am-jN9AYwCaUZ3gYsDnSSOtE")).json()
        this.setState({points})
        console.log(this.state.points);
    }

    render() {
        const mapStyles = {
            width: '84%',
            height: '69%',
            marginLeft: 'auto',
            marginRight: 'auto',
        };

        return (
            <div className="map-container">
                <Map className="map-map"
                    google={this.props.google}
                    zoom={5}
                    style={mapStyles}
                    initialCenter={{ lat: 0.0, lng: 0.0 }}
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
