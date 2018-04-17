import React from 'react';
import Task from './task';
import {Accordion, AccordionItem} from 'react-sanfona';
import {Button} from 'reactstrap';
import {Link, Route, Redirect} from 'react-router-dom';
import Bus from './bus';
import api from '../api';

export function route(props) {

    console.log(props);

    function addfav(route_id) {
        var data = {"route_id": route_id};
        api.addFavourite(props.channel, data);
    }

    function delfav(route_id) {
        var data = {"route_id": route_id};
        api.removeFavourite(props.channel, data);
    }

    return (<div className="d-flex  h-100">
        <div className="d-flex flex-column mx-auto py-2 w-100">
            <div className="row justify-content-center">
                <Accordion className="w-100" id="nestedCard">
                    {
                        props.routes.map(route => {
                            return (<AccordionItem title={"Route Number:" + route.routeid} expanded={route === 1}
                                                   className="card" key={route.routeid}>
                                {props.favs.some(fav => fav.route_id === route.routeid)
                                    ? <Button className="material-icons colorstar md48 float-right"
                                              color="none"
                                              onClick={() => delfav(route.routeid)}>
                                        star
                                    </Button> :
                                    <Button className="material-icons colorstar md48 float-right"
                                            onClick={() => addfav(route.routeid)}
                                            color="none">
                                        star_border
                                    </Button>}
                                <div className="card-body">
                                    <div className="list-group">
                                        {
                                            route.buses.length === 0 ?
                                                <div>No Buses are currently running in this route</div> :
                                                route.buses.map(bus => {
                                                    return <Bus channel={props.channel} bus={bus}/>
                                                })
                                        }
                                    </div>
                                </div>
                            </AccordionItem>);
                        })
                    }
                </Accordion>
            </div>
        </div>
    </div>);
}

//source: https://github.com/NatTuck/microblog-spa/blob/lec19-end/assets/js/cs/feed.jsx
