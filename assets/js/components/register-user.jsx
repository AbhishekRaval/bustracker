import React from 'react';
import {connect} from 'react-redux';
import {Button, FormGroup, Form, Label, Input} from 'reactstrap';
import {Link, Route, Redirect} from 'react-router-dom';
import swal from 'sweetalert'
import api from '../api';

function LoginForm(props) {

    function update(ev) {
      let tgt = $(ev.target);
      let data = {};
      data[tgt.attr('name')] = tgt.val();
      props.dispatch({
        type: 'UPDATE_REGISTER_FORM',
        data: data,
      });
    }

    function create_token(ev) {
        api.create_user(props.register,props.history);
    }


  return <div className="d-flex align-items-center justify-content-center h-100 py-5">
  <div className="d-flex flex-column mx-auto">
      <h3>Welcome to TaskTracker Application</h3>
    <div className="row justify-content-center">
    <Form >
      <FormGroup>
        Email:
        <Input type="email" name="email" placeholder="email"
               value={props.register.email}  onChange={update} />
      </FormGroup>
      <FormGroup>
        Name:
        <Input type="text" name="name" placeholder="name"
               value={props.register.name}  onChange={update} />
      </FormGroup>
      <FormGroup>
        Password:
        <Input type="password" name="password" placeholder="password"
               value={props.register.password} onChange={update} />
      </FormGroup>
      <Button className="mr-2" color="primary" onClick={create_token}>Register</Button>
    </Form>
    </div>
    </div>
  </div>;
}

function state2props(state) {
  //console.log("rerender", state);
  return {token: state.token};
}

// Export the result of a curried function call.
export default connect(state2props)(LoginForm);

//Source: http://www.ccs.neu.edu/home/ntuck/courses/2018/01/cs4550/notes/20-redux/notes.html
