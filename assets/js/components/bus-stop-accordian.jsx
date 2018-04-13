import React from 'react';
import Task from './task';
import {Accordion, AccordionItem} from 'react-sanfona';
import {Link, Route, Redirect} from 'react-router-dom';

import BusTrackingGraph from './bus-tracking';

export default function BusAccordian(params) {
  return (<div className="d-flex  h-100 py-5">
    <div className="d-flex flex-column align-self-center col-4">
      <div className="row justify-content-center">
        <h3>Start and End Stops of Bus Here</h3>
      </div>
    </div>
    <div className="d-flex flex-column col-8">

      <h3 className="row justify-content-center">Select Bus</h3>
      <div className="row justify-content-center">
        <Accordion>
          {
            [1, 2, 3, 4, 5].map(item => {
              return (<AccordionItem title={`Bus Stop${item}`} expanded={item === 1} className="card" key={item}>
                <div className="card-body">
                  {`Buses at  BusStop ${item}`}
                  <div className="list-group">
                    {//Loop the map of buses for given busstop
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
