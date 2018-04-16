import React from 'react';
import Task from './task';
import {Accordion, AccordionItem} from 'react-sanfona';
import {Link, Route, Redirect} from 'react-router-dom';
import Bus from './bus';

export function route(props) {
  return (<div className="d-flex  h-100 py-5">
    <div className="d-flex flex-column col-8">

      <div className="row justify-content-center">
        <Accordion>
          {
            props.routes.map(route => {
              return (<AccordionItem title={route.routeid} expanded={route === 1} className="card" key={<route className="routeid">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     </route>}>
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
                    <button type="button" className="list-group-item list-group-item-secondary list-group-item-action ">Northeastern</button>
                    <button type="button" className="list-group-item list-group-item-primary list-group-item-action">Symphony</button>
                    <button type="button" className="list-group-item list-group-item-info list-group-item-action">Heath Street</button>
                    <button type="button" className="list-group-item list-group-item-action" disabled>4</button>
                  </div>
                </div>
              </AccordionItem>);
            })
          }
        </Accordion>
        {/* <BusTrackingGraph /> get a bus tracking graph using this.*/}
      </div>
    </div>
  </div>);
}

//source: https://github.com/NatTuck/microblog-spa/blob/lec19-end/assets/js/cs/feed.jsx
