import React from 'react';
import Task from './task';
import {Link, Route, Redirect} from 'react-router-dom';
import {Button, Card, CardTitle, CardText, CardBody} from 'reactstrap';
import {connect} from 'react-redux';
import api from '../api';
import Map from './map';

class BusTracking extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {socket, bus_id} = this.props;
        let channel = socket.channel("buses:" + bus_id);
        channel.join();
        api.fetch_live_information(channel);
    }

    render() {

        if (!this.props.bus)
            return null;

        console.log(this.props);

        var bus = this.props.bus;
        var bus_stops = this.props.bus_stops
        var bus_coords = {lat: bus.latitude, lng: bus.longitude}

        return (<div className="wrappernew h-100">
                <div className=" h-100 row">
                    <div className="col d-flex flex-column justify-content-center">
                        <div className="col d-flex mx-3">
                            <div className="row align-items-center w-50">
                                <Card body="body" inverse style={{
                                    backgroundColor: '#333',
                                    borderColor: '#333',
                                    maxwidth: '50%',
                                    maxheight: '50%'
                                }}>
                                    <CardBody>
                                        <CardText>
                                            Heading Towards: {bus_stops[bus_stops.length - 1].stopname}
                                        </CardText>
                                        <CardText>
                                            Current Status: {bus.current_status}
                                        </CardText>
                                        <CardText>
                                            Bus Stop: {bus_stops.find((bus_stop) => {
                                            return bus.current_stop_sequence === bus_stop.stopseq
                                        }).stopname}
                                        </CardText>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                        <div className="col px-2 justify-content-start h-100 ">
                            <div className="row align-items-center w-100">
                                <Map bus_coords={bus_coords} apiKey={"AIzaSyCOtyRHvosWiK3eFuaKO5ETx3nmk0ty8dQ"}/>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center h-100 col">
                        <div className="row h-75">
                            <ul className="StepProgress ">
                                {bus_stops.map((bus_stop) => {
                                    if (bus_stop.stopseq < bus.current_stop_sequence) {
                                        return <li className="StepProgress-item is-done">
                                            <strong>{bus_stop.stopname}</strong>
                                        </li>;
                                    }
                                    else
                                        return <li className="StepProgress-item current">
                                            <strong>{bus_stop.stopname}</strong>
                                        </li>;
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    componentWillUnmount() {

        if (this.props.channel == null)
            return;

        console.log("Component Unmounted");
        this.props.dispatch({
            type: "CLEAR_BUS_LIVE",
        })

        this.props.channel.leave();
    }


}

export default connect(({
                            session,
                            bus_live
                        }, props) => {
    return Object.assign({}, session, bus_live, {bus_id: props.bus_id})
})(BusTracking);
