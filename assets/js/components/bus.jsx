import React from 'react';
import {Button, Card, CardTitle, CardText, CardBody} from 'reactstrap';
import api from '../api';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

function bus(props) {

    function track(vehicle_id) {
        console.log(vehicle_id);
        props.history.push("/buses/" + vehicle_id);
    }

    function date(time) {

        if (time == null)
            return 0;

        var busDate = Date.parse(time);
        var now = Date.now();
        var diff = Math.floor(((busDate - now) / 1000) / 60)
        return diff;
    }

    return <div>
      <Card>
        <CardBody>
          <CardTitle>Bus Heading Towards - {props.bus.hs}</CardTitle>
          <CardText> Arriving at - {
            date(props.bus.preds.arrivalTime) > 0 ?  "In " + date(props.bus.preds.arrivalTime) + " minutes" : "Arriving Now" } </CardText>
          <CardText> Direction: {props.bus.preds.directionId === 1 ? "INBOUND" : "OUTBOUND"}</CardText>
          <Button  className="bg-blue-button" onClick={() => track(props.bus.id)}>TRACK</Button>
        </CardBody>
      </Card>
    </div>;
}


function mapProps(state, props) {
    return Object.assign({}, props, {session: state.session});
}

export default withRouter(connect(mapProps)(bus));
