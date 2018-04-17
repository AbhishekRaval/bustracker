import React from 'react';
import {Button, Card, CardTitle, CardText, CardBody } from 'reactstrap';
import api from '../api';

export default function bus(props) {

    // function addFav() {
    //     api.addFavourite(props.channel,
    //         {
    //             "route_id": props.bus.vehicle.relationships.route.data.id,
    //             "direction_id": props.bus.vehicle.attributes.direction_id
    //         });
    // }
    //
    // function delFav() {
    //     api.removeFavourite(props.channel,
    //         {
    //             "route_id": props.bus.vehicle.relationships.route.data.id,
    //             "direction_id": props.bus.vehicle.attributes.direction_id
    //         });
    // }

    return <div>
      <Card>
        <CardBody>
          <CardTitle>Bus Heading Towards - {props.bus.hs}</CardTitle>
          <CardText> Arriving at - X seconds </CardText>
          <CardText> Track the bus</CardText>
        </CardBody>
      </Card>
    </div>;
}
