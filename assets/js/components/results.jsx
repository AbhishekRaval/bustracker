import React from 'react';
import {route as BusRoute} from './route';

export default function results(props) {

    if (!props.results.results)
        return <div>Fill the Fields to get bus information</div>;

    if (props.results.results[0].catbuses.length > 0) {
        let routes = props.results.results[0].catbuses
        let stopid = props.results.results[0].stopid;
        return <BusRoute favs={props.favs} routes={routes}
                  stopid={stopid} channel={props.session.channel}/>;
    }

    return <div>Sorry. No Bus found</div>;
}
