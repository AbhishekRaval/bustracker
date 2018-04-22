import React from 'react';
import {Accordion, AccordionItem} from 'react-sanfona';
import {Button} from 'reactstrap';
import {Link, Route, Redirect} from 'react-router-dom';
import Bus from './bus';
import api from '../api';

export function route(props) {

    function addfav(route_id,stop_id, e) {
      e.stopPropagation();
        var data = {"route_id": route_id, "stop_id" : stop_id};
        api.addFavourite(props.channel, data);
    }

    function delfav(route_id,stop_id, e) {
        e.stopPropagation();
        var data = {"route_id": route_id, "stop_id" : stop_id};
        api.removeFavourite(props.channel, data);
    }

    let stop_id = props.stopid;
    return (<div className="d-flex  h-100">
      <div className="d-flex flex-column  py-2 w-100">
        <div className="row justify-content-center">
          <Accordion className="w-100 nestedCard">
            {
              props.routes.map(route => {
                return (<AccordionItem title={<span className="react-sanfona-item-title2 text-center">
                  <Button className="routeid mt-2 text-white" color="link">Route Number: {route.routeid}</Button>
                  {props.favs.some(fav => fav.route_id === route.routeid && fav.stop_id == stop_id)
                    ? <Button className="material-icons colorstar routeid md-36 float-right"
                      color="link"
                      onClick={(e) => delfav(route.routeid, stop_id ,e)}>
                      star
                    </Button> :
                    <Button className="material-icons colorstar md-36 routeid float-right"
                      onClick={(e) => addfav(route.routeid, stop_id, e)}
                    color="link">
                      star_border
                    </Button>} </span>} expanded={route === 1}
                  className="card" key={route.routeid}>
                  <div className="card-body">
                    <div className="list-group">
                      {
                        route.buses.length === 0 ?
                          <div>No Buses are currently running in this route</div> :
                          route.buses.map((bus, index) => {
                            return <Bus channel={props.channel} bus={bus} key={index} />
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
