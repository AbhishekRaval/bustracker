import React from 'react';
import BusStop from './busstop';
import api from '../api';
import {Button, Card, CardBody, CardTitle, CardText, CardHeader} from 'reactstrap';
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
        anavigator.geolocation.getCurrentPosition(success, failure, {maximumAge: 10000});
    }

    render() {

        if (this.props.listStops.busStops.length === 0) {
            return  <div className="d-flex h-100">
              <div className="d-flex align-items center flex-column mx-auto">
                <div className="row justify-content-center h-50">
                  <img src="images/Ripple-1s-200px.svg" height="120%" width="110%"  alt="Loading icon" />
                </div>
                <h3 className="pt-5 row justify-content-center">Fetching Bus Stops near your location, please wait.</h3>
              </div>
            </div>
        }
        else return <div>
          <div className="d-flex h-100">
            <div className="d-flex flex-column mx-auto py-2 w-100">
              <h3 className="row justify-content-center"><Button onClick={this.detectLocation}> Detect
              Location </Button></h3>
              <div className="row justify-content-center">
                <Accordion>
                  {
                    this.props.listStops.busStops.map(busStop => {
                      return (
                        <AccordionItem title={busStop.name} expanded={busStop === 1} className="card accordiontitle"
                          key={busStop.id}>
                          <div className=" card-body list-group">
                            <Card>
                              <CardHeader>
                                Your Individual Bus Details here
                              </CardHeader>
                              <CardBody>
                                <CardTitle>Bus Heading Towards</CardTitle>
                                <CardText> Arriving at : </CardText>
                                <CardText> Tack the bus</CardText>
                                <Button className="material-icons colorstar md48" color="none">star_border</Button>
                                <Button className="material-icons colorstar md48" color="none">star</Button>
                              </CardBody>
                            </Card>

                            <Card>
                              <CardHeader>
                                Your Individual Bus Details here
                              </CardHeader>
                              <CardBody>
                                <CardTitle className="text-center">Bus Title Here</CardTitle>
                                <CardText>abc</CardText>
                              </CardBody>
                            </Card>
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
