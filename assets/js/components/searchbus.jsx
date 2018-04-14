import React from 'react';
import BusStop from './busstop';
import api from '../api';
import {Button} from 'reactstrap';

export class SearchBus extends React.Component{

    componentDidMount() {
        // Request for location information should be asked here.
        var thisObj = this;

        let success = function(pos) {
            api.fetch_bus_stops(thisObj.props.channel, pos);
        };

        let failure = function (err) {
            console.log(err);
        };

        if (navigator.geolocation) {
            console.log("Fetching position");
            if (this.props.listStops.busStops.length === 0)
                navigator.geolocation.getCurrentPosition(function(){}, function() {}, {});
                navigator.geolocation.watchPosition(success, failure, {maximumAge: 10000});
        } else {
            window.alert("Geolocation is not supported");
        }
    }

    detectLocation()    {

        var thisObj = this;

        let success = function(pos) {
            api.fetch_bus_stops(thisObj.props.channel, pos);
        };

        let failure = function (err) {
            console.log(err);
        };

        navigator.geolocation.getCurrentPosition(function(){}, function() {}, {});
        anavigator.geolocation.watchPosition(success, failure, {maximumAge: 10000});
    }

    render()    {

        if (this.props.listStops.busStops.length === 0)  {
            return <div>Either the data is being fetched or you did not grant access to the location </div>;
        }
        else return <div>
            <Button onClick={this.detectLocation}> Detect Location </Button>
            {this.props.listStops.busStops.map( (busStop) =>
                <BusStop key={busStop.id}
                         busstop={busStop}
                        channel={this.props.channel} />) }
        </div>;
    }
}