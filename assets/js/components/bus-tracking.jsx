import React from 'react';
import Task from './task';
import {Link, Route, Redirect} from 'react-router-dom';
import {Button, Card, CardTitle, CardText, CardBody} from 'reactstrap';

export default class BusTrackingGraph extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {

        return(
        <div className="wrappernew h-100">
          <div className="d-flex h-100">
            <div className="d-flex align-items-center justify-content-center h-100 col-6">
              <div className="row justify-content-center">
                <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333', maxwidth: '18em', maxheight: '5em'}}>
                  <CardBody>
                    <CardTitle>Bus Heading Towards - </CardTitle>
                    <CardText> Arriving at - X seconds </CardText>
                    <CardText> Direction: </CardText>
                  </CardBody>
                </Card>
              </div>
            </div>
            <div className="d-flex align-items-center ml-5 h-100 col-6">
              <div className="row">
                <ul className="StepProgress ">
                  <li className="StepProgress-item is-done">
                    <strong>Station1</strong>
                  </li>
                  <li className="StepProgress-item is-done">
                    <strong>Station1</strong>
                  </li>
                  <li className="StepProgress-item is-done">
                    <strong>Station1</strong>
                  </li>
                  <li className="StepProgress-item is-done">
                    <strong>Station1</strong>
                  </li>
                  <li className="StepProgress-item current">
                    <strong>Station1</strong>
                  </li>
                  <li className="StepProgress-item current">
                    <strong>Station1</strong>
                  </li>
                  <li className="StepProgress-item current">
                    <strong>Provide feedback</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>);
    }
}
