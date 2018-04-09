import React from 'react';
import {connect} from 'react-redux';
import {Button, FormGroup, Label, Input} from 'reactstrap';
import {Link, Route, Redirect} from 'react-router-dom';
import swal from 'sweetalert'
import api from '../api';

function PostForm(params) {

  //If things break TODO: do some stuff here.
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    // console.log();
    if($('#completeCheck').prop('checked'))
    {
      data['complete'] = true;
    }
    else{
      data['complete']   = false;
    }
    // console.log(data);
    let action = {
      type: 'UPDATE_FORM',
      data: data
    };
    // console.log(action);
    params.dispatch(action);
  }

  function submit(ev) {
    if ( (Number(params.form.timespent) < 0) || (Number(params.form.timespent)%15 !== 0) )
    {
      swal("Enter time in Interval of 15 minutes");
    }

    else if(params.form.name == "" || params.form.description == "" || params.form.assigns_id == "" ||
  params.form.user_id == "" || params.form.timespent == ""){
      swal("None of the field should be empty.");
    }
    else{
    api.submit_post(params.form);
    clear();
    params.history.push("/feed");
  }
  }

  function clear(ev) {
    params.dispatch({
      type: 'CLEAR_FORM',
    });
  }

  let users = _.map(params.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
  return <div style={{
      padding: "4ex"
    }}>
    <h2>Create New Task</h2>
    <FormGroup>
      <Label for="user_id">Assign task to:
      </Label>
      <Input type="select" name="user_id" value={params.form.user_id} onChange={update}>
        <option></option>
        {users}
      </Input>
    </FormGroup>

    <FormGroup>
      <Label for="assigns_id">Assign task by:
      </Label>
      <Input type="select" name="assigns_id" value={params.form.assigns_id} onChange={update}>
        <option></option>
        {users}
      </Input>
    </FormGroup>

    <FormGroup>
      <Label for="name">Name:
      </Label>
      <Input type="textinput" name="name" value={params.form.name} onChange={update}/>
    </FormGroup>

    <FormGroup>
      <Label for="description">Description:
      </Label>
      <Input type="textarea" name="description" value={params.form.description} onChange={update}/>
    </FormGroup>

    <FormGroup check>
      <Label check>
      <Input type="checkbox" id="completeCheck" name="complete" value={params.form.complete}  checked={params.form.complete} onChange={update}/>{'  '}
    Mark as Complete
    </Label>
    </FormGroup>

    <FormGroup>
      <Label for="timespent" className="mr-3">Enter Time spent:
      </Label>
      <Input type="number" className="text-center" name="timespent" min="0" step="15" value={params.form.timespent} onChange={update}/></FormGroup>
      <Button className=" btn btn-primary  mr-3" onClick={submit} color="primary">Add Task</Button>
    <Link to={"/feed"} id="feedbtn" className="btn btn-secondary">Back</Link>

  </div>;
}

function state2props(state) {
  console.log("rerender", state);
  return {form: state.form};
}

// Export the result of a curried function call.
export default connect(state2props)(PostForm);

//Source: http://www.ccs.neu.edu/home/ntuck/courses/2018/01/cs4550/notes/20-redux/notes.html
