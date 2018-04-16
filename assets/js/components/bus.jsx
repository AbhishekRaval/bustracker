import React from 'react';
import {Button, Card, CardTitle, CardText, CardBody } from 'reactstrap';
import api from '../api';

export default function bus(props) {

    function addFav() {
        console.log("Add Favourite called");
        api.addFavourite(props.channel,
            {
                "route_id": props.bus.vehicle.relationships.route.data.id,
                "direction_id": props.bus.vehicle.attributes.direction_id
            });
    }

    function delFav() {
        console.log("Delete Favourite called");
        api.removeFavourite(props.channel,
            {
                "route_id": props.bus.vehicle.relationships.route.data.id,
                "direction_id": props.bus.vehicle.attributes.direction_id
            });
    }

    return <div>
      {/* <span>Bus Heading Towards: {props.bus.hs}</span> */}
      {/* <Button onClick={props.favourite === false ? addFav : delFav}>
        {props.favourite === false ? "Add to Favourite" : "Remove from Favourite"}
      </Button> */}
      <Card>
        <CardBody>
          <CardTitle>Bus Heading Towards - {props.bus.hs}</CardTitle>
          <CardText> Arriving at - X seconds </CardText>
          <CardText> Track the bus</CardText>
          <Button className="material-icons colorstar md48" color="none">star_border</Button>
          <Button className="material-icons colorstar md48" color="none">star</Button>
        </CardBody>
      </Card>
    </div>;
}
