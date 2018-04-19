import {Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React from 'react';

const style = {
    width: '100%',
    height: '100%'
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
        console.log("props is lat long is here is the" + props.bus_coords.lat  + props.bus_coords.lng);


    return <Map google={props.google}
                initialCenter={{
                    lat: props.bus_coords.lat,
                    lng: props.bus_coords.lng
                }}
                // center={{
                //     lat: props.bus_coords.lat,
                //     lng: props.bus_coords.lng
                // }}
                 zoom={13}
                 style={style}
                className={'ml-md-5 mt-md-1'}>
                <Marker
                    title={'Bus is Here'}
                    name={'Your position'}
                    position={{lat: props.bus_coords.lat, lng: props.bus_coords.lng}}
                    icon={{
                        url: "/images/bus.png",
                        anchor: new google.maps.Point(70,70),
                        scaledSize: new google.maps.Size(42,42)
                    }}/>
                {/*<Marker*/}
                    {/*title={'The marker`s title will appear as a tooltip.'}*/}
                    {/*name={'SOMA'}*/}
                    {/*position={{lat: 37.778519, lng: -122.405640}}*/}
                    {/*icon={{*/}
                        {/*url: "/images/busstop.png",*/}
                        {/*anchor: new google.maps.Point(32, 32),*/}
                        {/*scaledSize: new google.maps.Size(32, 32)*/}
                    {/*}}/>*/}
                {/*<Marker*/}
                    {/*title={'The marker`s title will appear as a tooltip.'}*/}
                    {/*name={'SOMA'}*/}
                    {/*position={{lat: 37.778519, lng: -122.405640}}*/}
                    {/*icon={{*/}
                        {/*url: "/images/busstop.png",*/}
                        {/*anchor: new google.maps.Point(32, 32),*/}
                        {/*scaledSize: new google.maps.Size(32, 32)*/}
                    {/*}}/>*/}
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