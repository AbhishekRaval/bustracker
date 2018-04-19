import {Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React from 'react';

const style = {
    width: '40%',
    height: '60%'
}

function MapContainer(props) {
    //
    // state = {
    //     showingInfoWindow: false,
    //     activeMarker: {},
    //     selectedPlace: {},
    // };
    //
    // onMarkerClick = (props, marker, e) =>
    //     this.setState({
    //         selectedPlace: props,
    //         activeMarker: marker,
    //         showingInfoWindow: true
    //     });
    //
    // onMapClicked = (props) => {
    //     if (this.state.showingInfoWindow) {
    //         this.setState({
    //             showingInfoWindow: false,
    //             activeMarker: null
    //         })
    //     }
    // };

    // render() {

        console.log(props);

        return <Map google={props.google}
                 zoom={12}
                 style={style}
                 onReady={props.fetchPlaces}
                    >
                <Marker
                    title={'Bus is Here'}
                    name={'Your position'}
                    position={{lat: props.bus_coords.lat, lng: props.bus_coords.lng}}
                    icon={{
                        url: "/images/bus.png",
                        anchor: new google.maps.Point(32, 32),
                        scaledSize: new google.maps.Size(32, 32)
                    }}/>
                <Marker
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'SOMA'}
                    position={{lat: 37.778519, lng: -122.405640}}
                    icon={{
                        url: "/images/busstop.png",
                        anchor: new google.maps.Point(32, 32),
                        scaledSize: new google.maps.Size(32, 32)
                    }}/>
                <Marker
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'SOMA'}
                    position={{lat: 37.778519, lng: -122.405640}}
                    icon={{
                        url: "/images/busstop.png",
                        anchor: new google.maps.Point(32, 32),
                        scaledSize: new google.maps.Size(32, 32)
                    }}/>
                {/*<InfoWindow*/}
                    {/*marker={this.state.activeMarker}*/}
                    {/*visible={this.state.showingInfoWindow}>*/}
                    {/*<div>*/}
                        {/*<h1>{this.state.selectedPlace.name}</h1>*/}
                    {/*</div>*/}
                {/*</InfoWindow>*/}
            </Map>;
        // );
    // }
}

export default GoogleApiWrapper(props => props)(MapContainer)

// {apiKey: ('AIzaSyCOtyRHvosWiK3eFuaKO5ETx3nmk0ty8dQ')}