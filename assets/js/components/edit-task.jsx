import React from 'react';
import {connect} from 'react-redux';
import {Button, FormGroup, Label, Input} from 'reactstrap';
import {Link, Route, Redirect} from 'react-router-dom';

import api from '../api';

function EditTask(params) {
    //If things break TODO: do some stuff here.
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    if($('#completeCheck').prop('checked'))
    {
      data['complete'] = true;
    }
    else{
      data['complete']   = false;
    }
    //console.log(data);
    let action = {
      type: 'UPDATE_TASK',
      data: data
    };
    //console.log(action);
    params.dispatch(action);
  }
  function updateTask(ev) {
    if ( (Number(params.edit_form.timespent) < 0) || (Number(params.edit_form.timespent)%15 !== 0) )
    {
      swal("Enter time in Interval of 15 minutes");
    }

    else if(params.edit_form.name == "" || params.edit_form.description == "" || params.edit_form.assigns_id == "" ||
  params.edit_form.user_id == "" || params.edit_form.timespent == ""){
      swal("None of the field should be empty.");
    }
    else{
    api.update_task(params.edit_form, params.edit_form.task_id);
    $("Link").trigger('click');
    clear();
    params.history.push("/feed");
  }
  }

  function clear(ev) {
    params.dispatch({
      type: 'CLEAR_EDIT_FORM',
    });
  }

  let users = _.map(params.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
  return <div style={{
      padding: "4ex"
    }}>
    <h2>Update Task </h2>
    <FormGroup>
      <Label for="user_id">Assign task to:
      </Label>
      <Input type="select" name="user_id" value={params.edit_form.user_id} onChange={update}>
        <option></option>
        {users}
      </Input>
    </FormGroup>

    <FormGroup>
      <Label for="assigns_id">Assign task by:
      </Label>
      <Input type="select" name="assigns_id" value={params.edit_form.assigns_id} onChange={update}>
        <option></option>
        {users}
      </Input>
    </FormGroup>

    <FormGroup>
      <Label for="name">Name:
      </Label>
      <Input type="textinput" name="name" value={params.edit_form.name} onChange={update}/>
    </FormGroup>

    <FormGroup>
      <Label for="description">Description:
      </Label>
      <Input type="textarea" name="description" value={params.edit_form.description} onChange={update}/>
    </FormGroup>

    <FormGroup check>
      <Label check>
      <Input type="checkbox" id="completeCheck" name="complete" value={params.edit_form.complete}  checked={params.edit_form.complete} onChange={update}/>{'  '}
    Mark as Complete
    </Label>
    </FormGroup>

    <FormGroup>
      <Label for="timespent" className="mr-3">Enter Time spent:
      </Label>
      <Input type="number" className="text-center" name="timespent" min="0" step="15" value={params.edit_form.timespent} onChange={update}/></FormGroup>
    <Button className="btn btn-primary mr-3" onClick={updateTask} color="primary">Update Task</Button>
  <Link to = {"/feed"} id="feedbtn" className="btn btn-secondary">Back</Link>

  </div>;
}

function state2props(state) {
  //console.log("rerender", state);
  return {edit_form: state.edit_form};
}

// Export the result of a curried function call.
export default connect(state2props)(EditTask);

//Source: http://www.ccs.neu.edu/home/ntuck/courses/2018/01/cs4550/notes/20-redux/notes.html
