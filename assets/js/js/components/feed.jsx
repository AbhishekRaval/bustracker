import React from 'react';
import Task from './task';
import {Link, Route, Redirect} from 'react-router-dom';

export default function Feed(params) {
  let tasks = _.map(params.tasks, (pp) => <Task key={pp.id} task={pp}/>);
  return <div>
    <h3 className="mt-2"> Admin's Dashboard</h3>
    <h5>Account Details:</h5>
    <ul>
      <li><strong>Name:</strong> Admin</li>
      <li><strong>Email:</strong> admin@tasks3.com</li>
    </ul>
    <Link to={"/tasks/new"} className="btn btn-primary my-3">
      Add a New Task</Link>
    {tasks}
  </div>;
}

//source: https://github.com/NatTuck/microblog-spa/blob/lec19-end/assets/js/cs/feed.jsx
