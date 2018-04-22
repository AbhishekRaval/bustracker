import React from 'react';
import api from '../api';
import {Button} from 'reactstrap';
import {Accordion, AccordionItem} from 'react-sanfona';
import {Link, Route, Redirect} from 'react-router-dom';
import {route as BusRoute} from './route';

export class SearchBus extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.detectLocation();
    }

    componentWillUnmount()  {
        this.props.dispatch({
            type: "CLEAR_BUS_STOPS",
        });
    }

    detectLocation() {

        const thisObj = this;

        let success = function (pos) {
            api.fetch_bus_stops(thisObj.props.channel, pos);
            api.fetch_favourites(thisObj.props.channel);
        };

        let failure = function (err) {};

        navigator.geolocation.getCurrentPosition(function () {
        }, function () {
        }, {});

        navigator.geolocation.getCurrentPosition(success, failure, {maximumAge: 10000});

    }

    render() {

        if (this.props.listStops.busStops.length === 0) {
            return <div className="d-flex h-100">
                <div className="d-flex align-items center flex-column mx-auto">
                    <div className="row justify-content-center h-50">
                        <img src="images/Ripple-1s-200px.svg" height="120%" width="110%" alt="Loading icon"/>
                    </div>
                    <div className="text-center font-weight-bold h5 mt-5">Fetching Bus Stops near your location, please
                        wait.</div>
                </div>
            </div>
        }
        else {

            return <div>
              <div className="d-flex h-100">
                <div className="d-flex flex-column mx-auto py-2 w-100">
                  <h3 className="row justify-content-center mx-3"><Button onClick={this.detectLocation.bind(this)}>
                    Update New Location
                  </Button>
                  </h3>

                  <div className="row justify-content-center">
                    <Accordion>
                      {
                        this.props.listStops.busStops.map(busStop => {
                          return (
                            <AccordionItem title={busStop.stopname} expanded={busStop === 1}
                              className="card accordiontitle"
                              key={busStop.stopid}>
                              <div className="card-body">
                                <BusRoute favs={this.props.favs} routes={busStop.catbuses}
                                  stopid={busStop.stopid} channel={this.props.channel}/>
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
