import React from 'react';
import {Button, Card, CardTitle, CardText, CardBody} from 'reactstrap';
import api from '../api';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

function bus(props) {

    function track(vehicle_id)    {
        console.log(vehicle_id);
        props.history.push("/buses/" + vehicle_id);
    }

    return <div>
      <Card>
        <CardBody>
          <CardTitle>Bus Heading Towards - {props.bus.hs}</CardTitle>
          <CardText> Arriving at - X seconds </CardText>
          <CardText> Direction: {props.bus.vehicle.attributes.direction_id === 1 ? "INBOUND" : "OUTBOUND"}</CardText>
          <Button onClick={() => track(props.bus.vehicle.id)} className="bg-blue-button">TRACK</Button>
        </CardBody>
      </Card>
    </div>;
}


function mapProps(state, props) {
    return Object.assign({}, props, {session: state.session});
}

export default withRouter(connect(mapProps)(bus));
