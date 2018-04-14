import React from 'react';
import BusStop from './busstop';
import api from '../api';
import {Button} from 'reactstrap';
import {Accordion, AccordionItem} from 'react-sanfona';
import {Link, Route, Redirect} from 'react-router-dom';

export class SearchBus extends React.Component {

    componentDidMount() {
        // Request for location information should be asked here.
        var thisObj = this;

        let success = function (pos) {
            api.fetch_bus_stops(thisObj.props.channel, pos);
        };

        let failure = function (err) {
            console.log(err);
        };

        if (navigator.geolocation) {
            console.log("Fetching position");
            if (this.props.listStops.busStops.length === 0)
                navigator.geolocation.getCurrentPosition(function () {
                }, function () {
                }, {});
            navigator.geolocation.watchPosition(success, failure, {maximumAge: 10000});
        } else {
            window.alert("Geolocation is not supported");
        }
    }

    detectLocation() {

        var thisObj = this;

        let success = function (pos) {
            api.fetch_bus_stops(thisObj.props.channel, pos);
        };

        let failure = function (err) {
            console.log(err);
        };

        navigator.geolocation.getCurrentPosition(function () {
        }, function () {
        }, {});
        anavigator.geolocation.watchPosition(success, failure, {maximumAge: 10000});
    }

    render() {

        if (this.props.listStops.busStops.length === 0) {
            return <div>Either the data is being fetched or you did not grant access to the location </div>;
        }
        else return <div>

            <div className="d-flex  h-100 py-5">
                <div className="d-flex flex-column">

                    <h3 className="row justify-content-center"><Button onClick={this.detectLocation}> Detect
                        Location </Button></h3>
                    <div className="row justify-content-center">
                        <Accordion>
                            {
                                this.props.listStops.busStops.map(busStop => {
                                    return (
                                        <AccordionItem title={busStop.name} expanded={busStop === 1} className="card"
                                                       key={busStop.id}>
                                            <div className="card-body">
                                                {`Buses at  BusStop ` + busStop.name}
                                                <div className="list-group">
                                                    {//Loop the map of buses for given busstop
                                                    }
                                                    <button type="button"
                                                            className="list-group-item list-group-item-secondary list-group-item-action ">Northeastern
                                                    </button>
                                                    <button type="button"
                                                            className="list-group-item list-group-item-primary list-group-item-action">Symphony
                                                    </button>
                                                    <button type="button"
                                                            className="list-group-item list-group-item-info list-group-item-action">Heath
                                                        Street
                                                    </button>
                                                    <button type="button"
                                                            className="list-group-item list-group-item-action"
                                                            disabled>4
                                                    </button>
                                                </div>
                                            </div>
                                        </AccordionItem>);
                                })
                            }
                        </Accordion>
                        {/* <BusTrackingGraph /> get a bus tracking graph using this.*/}
                    </div>
                </div>
            </div>
            {/*{this.props.listStops.busStops.map( (busStop) =>*/}
            {/*<BusStop key={busStop.id}*/}
            {/*busstop={busStop}*/}
            {/*channel={this.props.channel} />) }*/}
        </div>;
    }
}