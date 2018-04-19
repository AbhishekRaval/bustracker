import React from 'react';
import Task from './task';
import {Link, Route, Redirect} from 'react-router-dom';
import {Button, Card, CardTitle, CardText, CardBody} from 'reactstrap';
import {connect} from 'react-redux';
import api from '../api';

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

        return (<div className="wrappernew h-100">
            <div className="d-flex h-100">
                <div className="d-flex align-items-center justify-content-center h-100 col-6">
                    <div className="row justify-content-center">
                        <Card body="body" inverse="inverse" style={{
                            backgroundColor: '#333',
                            borderColor: '#333',
                            maxwidth: '18em',
                            maxheight: '5em'
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
                <div className="d-flex align-items-center ml-5 h-100 col-6">
                    <div className="row h-75">
                        <ul className="StepProgress ">
                            {bus_stops.map((bus_stop) => {
                                if (bus_stop.stopseq < bus.current_stop_sequence)   {
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
        </div>);
    }


    componentWillUnmount()  {

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
