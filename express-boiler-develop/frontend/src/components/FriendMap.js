import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class FriendMap extends Component {
    state = {
        points: [],
        loading: true,
        data: []
    }
    async componentDidMount() {
        this.getData()
        
        // console.log(this.state.points.results[0].geometry.location);
    }

    async getData(){
        let data = await (await fetch("/api/person")).json()
        let points = await (await fetch("https://maps.googleapis.com/maps/api/geocode/json?address=Lomma&key=AIzaSyB4pPsphC1Am-jN9AYwCaUZ3gYsDnSSOtE")).json()
        this.setState({ points, loading: false })
        this.setState({ data})
        console.log(this.state.data)
    }

    render() {
        if (!this.state.loading) {
            console.log(this.state.points.results[0].address_components[0].long_name);
        }
        const mapStyles = {
            width: '84%',
            height: '79%',
            marginLeft: 'auto',
            marginRight: 'auto',
        };


        return (
            <div className="map-container">
                {this.state.loading ? <h1> asd </h1> :
                    <Map
                        className="map-map"
                        google={this.props.google}
                        zoom={2}
                        style={mapStyles}
                        initialCenter={{ lat: 30, lng: 1 }}
                        disableDefaultUI= {true}
                    >
                        <Marker 
                        title={this.state.points.results[0].address_components[0].long_name}
                        position={{
                            lat: this.state.points.results[0].geometry.location.lat,
                            lng: this.state.points.results[0].geometry.location.lng
                        }}
                        ></Marker>
                    </Map>
                }
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDsD9xKhLIEIGRR1NgmR5VZVZ5nyOOsuik"
})(FriendMap);
