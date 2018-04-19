import React from 'react';
import {Button} from 'reactstrap';
import api from "../api";

export default function busstop(props)  {
    function fetchBus(busStopId)    {
        api.fetch_bus(busStopId, props.channel);
    }

    return <div>
        <Button onClick={fetchBus(props.busstop.id)}>Bus stop Name: {props.busstop.name}</Button>
        Bus stop MBTA id: {props.busstop.id}
    </div>;
    }