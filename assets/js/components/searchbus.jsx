import React from 'react';
import BusStop from './busstop';
import api from '../api';

export class SearchBus extends React.Component{
    componentDidMount() {
        //TODO
        // Request for location information should be asked here.
        console.log("Component Mounted");
        var thisObj = this;

        let success = function(pos) {
            // thisObj.props.dispatch({
            //     type: "SET_LOCATION",
            //     coords: pos.coords,
            // });
            console.log(pos);
            api.fetch_bus_stops(thisObj.props.channel, pos);

        }

        let failure = function (err) {
            console.log(err);
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(){}, function() {}, {});
            navigator.geolocation.getCurrentPosition(success, failure ,{enableHighAccuracy : false, timeout: 3000, maximumAge: 3000});
        } else {
            console.log("Geolocation is not supported");
        }
    }

    render()    {
        if (this.props.listStops.coords == null)  {
            return <div>Either the data is being fetched or you did not grant access to the location </div>;
        }
        else return <div>
            {this.props.listStops.busStops.map( (busStop) =>  <BusStop busstop={busStop} />) }
        </div>;
    }
}