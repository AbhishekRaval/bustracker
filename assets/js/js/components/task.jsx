import React from 'react';
import {Card, CardBody, Button} from 'reactstrap';
import {Link} from 'react-router-dom';

import api from '../api';

export default function Task(params) {

  function deleteTask(ev){
    api.delete_task(params.task, params.task.id);
  }

  function editTask(ev){
    api.populate_task_details(params.task.id)
  }

  let task = params.task;
  return <Card>
    <CardBody>
      <div>
        <p>Task: {task.name}</p>
        <p>Task assigned to:
          <b>{task.user.name}</b>
        </p>
        <p>
          Description: {task.description}
        </p>
        <p>
          Status: {
            task.complete
              ? "Complete"
              : "Incomplete"
          }
        </p>
        <p>Timespent: {task.timespent} minutes</p>
        <span className="float-left">
          Task Assigned by:
          <strong>{task.assigns.name}</strong>
        </span>
        <Button className="float-right" onClick={deleteTask} color="danger">Delete Task</Button>
          <Link to={"/tasks/edit/" + task.id} onClick={editTask} className="btn btn-secondary float-right mr-2">
             Edit Task</Link>
      </div>
    </CardBody>
  </Card>;
}
