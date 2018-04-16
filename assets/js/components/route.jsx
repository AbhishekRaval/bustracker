import React from 'react';
import Task from './task';
import {Accordion, AccordionItem} from 'react-sanfona';
import {Button} from 'reactstrap';
import {Link, Route, Redirect} from 'react-router-dom';
import Bus from './bus';

export function route(props) {
  function addfav(ev){
    ev.preventDefault();    
  }
  return (  <div className="d-flex  h-100">
    <div className="d-flex flex-column mx-auto py-2 w-100">
      <div className="row justify-content-center">
        <Accordion className="w-100" id="nestedCard">
          {
            props.routes.map(route => {
              return (<AccordionItem title={
                <span class="react-sanfona-item-title">
                  Route Number: {route.routeid}
                  <Button className="material-icons colorstar md48 float-right" onClick={addfav} color="none">star_border</Button>
                </span>
              } expanded={route === 1} className="card" key={route.routeid}>
                <div className="card-body">
                  <div className="list-group">
                    {
                      route.buses.map(bus => {
                        return <Bus favourite={
                          props.favs.some(fav => fav.route_id === bus.vehicle.relationships.route.data.id
                          && fav.direction_id === bus.vehicle.attributes.direction_id)}
                          channel={props.channel}
                          bus={bus} />
                      })
                    }
                  </div>
                </div>
              </AccordionItem>);
            })
          }
        </Accordion>                {/* <BusTrackingGraph /> get a bus tracking graph using this.*/}
      </div>
    </div>
  </div>);
}

//source: https://github.com/NatTuck/microblog-spa/blob/lec19-end/assets/js/cs/feed.jsx
