import React from 'react';
import Task from './task';
import {Link, Route, Redirect} from 'react-router-dom';
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

        return <div className="wrappernew row justify-content-center">
            <ul className="StepProgress">


                <li className="StepProgress-item is-done">
                    <strong>Station1</strong>
                </li>
                <li className="StepProgress-item is-done">
                    <strong>Station1</strong>
                </li>
                <li className="StepProgress-item is-done">
                    <strong>Station1</strong>
                </li>
                <li className="StepProgress-item is-done">
                    <strong>Station1</strong>
                </li>
                <li className="StepProgress-item current">
                    <strong>Station1</strong>
                </li>
                <li className="StepProgress-item current">
                    <strong>Station1</strong>
                </li>
                <li className="StepProgress-item current">
                    <strong>Provide feedback</strong>
                </li>
            </ul>
        </div>;
    }
}

export default connect(
    ({session, bus_live}, props) =>
    {   console.log("Properties are", props);
        return Object.assign({}, session, bus_live, {bus_id: props.bus_id})}
        )(BusTracking);


