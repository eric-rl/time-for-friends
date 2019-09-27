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
                    className="map-map mb-5 br-2"
                    google={props.google}
                    zoom={2}
                    initialCenter={{ lat: 20, lng: 1 }}
                    disableDefaultUI={true}
                    styles = {[
                        {
                            "featureType": "all",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                }
                            ]
                        },
                        {
                            "featureType": "all",
                            "elementType": "labels.text.stroke",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 13
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#000000"
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "color": "#144b53"
                                },
                                {
                                    "lightness": 14
                                },
                                {
                                    "weight": 1.4
                                }
                            ]
                        },
                        {
                            "featureType": "landscape",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "color": "#08304b"
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#0c4152"
                                },
                                {
                                    "lightness": 5
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#000000"
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "color": "#0b434f"
                                },
                                {
                                    "lightness": 25
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#000000"
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "color": "#0b3d51"
                                },
                                {
                                    "lightness": 16
                                }
                            ]
                        },
                        {
                            "featureType": "road.local",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#000000"
                                }
                            ]
                        },
                        {
                            "featureType": "transit",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "color": "#146474"
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "color": "#021019"
                                }
                            ]
                        }
                    ]}
                >
                    {state.friends.map(city => (
                        <Marker
                            key={state.friends.indexOf(city)}
                            title={city.name.firstName}
                            icon={'https://img.icons8.com/ultraviolet/24/000000/marker.png'}
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


