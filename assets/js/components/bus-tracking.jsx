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
                <CardTitle>Bus Heading Towards -
                </CardTitle>
                <CardText>
                  Arriving at - X seconds
                </CardText>
                <CardText>
                  Direction:
                </CardText>
              </CardBody>
            </Card>
          </div>
        </div>
        <div className="d-flex align-items-center ml-5 h-100 col-6">
          <div className="row">
            <ul className="StepProgress ">
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
          </div>
        </div>
      </div>
    </div>);
  }
}

export default connect(({
  session,
  bus_live
}, props) => {
  console.log("Properties are", props);
  return Object.assign({}, session, bus_live, {bus_id: props.bus_id})
})(BusTracking);
