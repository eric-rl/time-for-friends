import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class FriendMap extends Component {
    state = {
        markerPoints: [],
        loading: true,
        data: []
    }
    async componentDidMount() {
        await this.getData()

        // console.log(this.state.points.results[0].geometry.location);
    }

    async getData() {
        let data = await (await fetch("/api/person")).json()
        // let points = await (await fetch("https://maps.googleapis.com/maps/api/geocode/json?address=Lomma&key=AIzaSyB4pPsphC1Am-jN9AYwCaUZ3gYsDnSSOtE")).json()
        // this.setState({ points, loading: false })
        this.setState({ data })
        console.log(this.state.data)

        let p
        let getMarkerPoints = []
        for (p of this.state.data) {
            getMarkerPoints.push(await (await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${p.location.city}&${p.location.country}&key=AIzaSyB4pPsphC1Am-jN9AYwCaUZ3gYsDnSSOtE`)).json())
            console.log(getMarkerPoints)
        }
        this.setState({ loading: false, markerPoints: getMarkerPoints })
        console.log(this.state.markerPoints)
    }

    render() {
        // if (!this.state.loading) {
        //     console.log(this.state.points.results[0].address_components[0].long_name);
        // }
        const mapStyles = {
            width: '84%',
            height: '79%',
            marginLeft: 'auto',
            marginRight: 'auto',
        };


        return (
            <div className="map-container">
                <Map
                    className="map-map"
                    google={this.props.google}
                    zoom={2}
                    style={mapStyles}
                    initialCenter={{ lat: 30, lng: 1 }}
                    disableDefaultUI={true}
                >
                    {this.state.loading ? (<h1> Loading </h1>) :
                        (
                            this.state.markerPoints.map(city => (

                                <Marker
                                    key={city.results}
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
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDsD9xKhLIEIGRR1NgmR5VZVZ5nyOOsuik"
})(FriendMap);
