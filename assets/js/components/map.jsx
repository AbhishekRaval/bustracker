import {Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React from 'react';

const style = {
    width: '100%',
    height: '100%'
}

function MapContainer(props) {
    return <Map google={props.google}
                initialCenter={{
                    lat: props.bus_coords.lat,
                    lng: props.bus_coords.lng
                }}
                 zoom={13}
                 style={style}
                className={'ml-md-5 ml-2 mt-md-1'}>
                <Marker
                    title={'Bus is Here'}
                    name={'Your position'}
                    position={{lat: props.bus_coords.lat, lng: props.bus_coords.lng}}
                    icon={{
                        url: "/images/bus.png",
                        anchor: new google.maps.Point(70,70),
                        scaledSize: new google.maps.Size(42,42)
                    }}/>
            </Map>;
}

export default GoogleApiWrapper(props => props)(MapContainer)