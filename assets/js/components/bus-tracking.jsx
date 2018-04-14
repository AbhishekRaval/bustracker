import React from 'react';
import Task from './task';
import {Link, Route, Redirect} from 'react-router-dom';

export default function BusTrackingGraph(params) {
  return (<div className="wrappernew row justify-content-center">
    <ul className="StepProgress">
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
  </div>);
}
