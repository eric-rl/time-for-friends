import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import '../css/spinner.css'

class FriendMap extends Component {
    state = {
        markerPoints: [],
        loading: true,
        data: []
    }
    async componentDidMount() {
        await this.getData()
    }

    async getData() {
        let data = await (await fetch("/api/person")).json()
        this.setState({ data })


        let getMarkerPoints = []
        for (let p of this.state.data) {
            getMarkerPoints.push(await (await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${p.location.city}&${p.location.country}&key=AIzaSyB4pPsphC1Am-jN9AYwCaUZ3gYsDnSSOtE`)).json())
        }
        this.setState({ loading: false, markerPoints: getMarkerPoints })
        console.log(this.state.markerPoints)
    }

    render() {
        return (
            <div className="col-10 offset-1">
                <h1 className='f1 tc'>Friend Map</h1>
                <div className="map-container">
                    <Map
                        className="map-map"
                        google={this.props.google}
                        zoom={2}
                        initialCenter={{ lat: 20, lng: 1 }}
                        disableDefaultUI={true}
                    >
                        {this.state.loading ? (<div className="sk-circle">
                            <div className="sk-circle1 sk-child"></div>
                            <div className="sk-circle2 sk-child"></div>
                            <div className="sk-circle3 sk-child"></div>
                            <div className="sk-circle4 sk-child"></div>
                            <div className="sk-circle5 sk-child"></div>
                            <div className="sk-circle6 sk-child"></div>
                            <div className="sk-circle7 sk-child"></div>
                            <div className="sk-circle8 sk-child"></div>
                            <div className="sk-circle9 sk-child"></div>
                            <div className="sk-circle10 sk-child"></div>
                            <div className="sk-circle11 sk-child"></div>
                            <div className="sk-circle12 sk-child"></div>
                        </div>) :
                            (
                                this.state.markerPoints.map(city => (

                                    <Marker
                                        key={this.state.markerPoints.indexOf(city)}
                                        title={city.results[0].address_components[0].long_name}
                                        position={{
                                            lat: city.results[0].geometry.location.lat,
                                            lng: city.results[0].geometry.location.lng
                                        }}
                                    ></Marker>
                                ))
                            )
                        }
                    </Map>
                </div>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDsD9xKhLIEIGRR1NgmR5VZVZ5nyOOsuik"
})(FriendMap);
