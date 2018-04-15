import React from 'react';
import api from '../api';
import {Button} from 'reactstrap';
import {Accordion, AccordionItem} from 'react-sanfona';
import {Link, Route, Redirect} from 'react-router-dom';
import {route as BusRoute} from './route';

export class SearchBus extends React.Component {

    componentDidMount() {

        const thisObj = this;

        let success = function (pos) {
            api.fetch_bus_stops(thisObj.props.channel, pos);
            api.fetch_favourites(thisObj.props.channel);
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
            api.fetch_favourites(thisObj.props.channel);
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
        else {
            console.log("Search bus properties are ");
            console.log(this.props);
            return <div>
                <div className="d-flex  h-100 py-5">
                    <div className="d-flex flex-column">
                        <h3 className="row justify-content-center"><Button onClick={this.detectLocation}> Detect
                            Location </Button></h3>
                        <div className="row justify-content-center">
                            <Accordion>
                                {
                                    this.props.listStops.busStops.map(busStop => {
                                        return (
                                            <AccordionItem title={busStop.stopname} expanded={busStop === 1}
                                                           className="card"
                                                           key={busStop.stopid}>
                                                <div className="card-body">
                                                    <BusRoute favs={this.props.favs} routes={busStop.catbuses}
                                                              channel={this.props.channel}/>
                                                </div>
                                            </AccordionItem>);
                                    })
                                }
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>;
        }
    }
}