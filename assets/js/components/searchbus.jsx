import React from 'react';
import BusStop from './busstop';
import api from '../api';
import {Button} from 'reactstrap';
import {Accordion, AccordionItem} from 'react-sanfona';
import {Link, Route, Redirect} from 'react-router-dom';
import Bus from './bus';

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
            if (this.props.listStops.busStops.length === 0)
                navigator.geolocation.getCurrentPosition(function () {
                }, function () {
                }, {});
            navigator.geolocation.getCurrentPosition(success, failure, {maximumAge: 10000});
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
        navigator.geolocation.getCurrentPosition(success, failure, {maximumAge: 10000});
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
                                                <div className="list-group">
                                                    {busStop.buses.length !== 0 ?
                                                        busStop.buses.map(bus => {
                                                            return <Bus bus={bus}/>
                                                        })
                                                        : <div>No Buses Found</div>
                                                    }
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