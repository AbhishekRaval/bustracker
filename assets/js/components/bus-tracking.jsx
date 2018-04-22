import React from 'react';
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

        var bus = this.props.bus;
        var bus_stops = this.props.bus_stops
        var bus_coords = {lat: bus.latitude, lng: bus.longitude}

        return ( <div className=" h-100 row">
                    <div className="col d-flex flex-column justify-content-md-center">
                        <div className="col col-md-4 d-flex ml-md-5 ml-2">
                            <div className="row align-items-center  h-100">
                                <Card  className="text-white bg-blue">
                                    <CardBody>
                                        <CardText className="text-white">
                                            Heading Towards: {bus_stops[bus_stops.length - 1].stopname}
                                        </CardText>
                                        <CardText className="text-white">
                                            Current Status: {bus.current_status}
                                        </CardText>
                                        <CardText className="text-white">
                                            Bus Stop: {bus_stops.find((bus_stop) => {
                                            return bus.current_stop_sequence === bus_stop.stopseq
                                        }).stopname}
                                        </CardText>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                        <div className="col mt-md-1 justify-content-start h-100">
                            <div className="row align-items-start w-100">
                                <Map bus_coords={bus_coords} apiKey={"AIzaSyCOtyRHvosWiK3eFuaKO5ETx3nmk0ty8dQ"}/>
                            </div>
                        </div>
                    </div>
                <div className="mt-md-5 col wrappernew d-flex align-items-center ">
                        <div className="row h-100">
                            <ul className="StepProgress ml-md-5">
                                {bus_stops.map((bus_stop) => {
                                    if (bus_stop.stopseq < bus.current_stop_sequence) {
                                        return <li className="StepProgress-item is-done">
                                           {bus_stop.stopname}
                                        </li>;
                                    }
                                    else
                                        return <li className="StepProgress-item current">
                                            {bus_stop.stopname}
                                        </li>;
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
        );
    }


    componentWillUnmount() {

        if (this.props.channel == null)
            return;

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
