import React from 'react';
import {connect} from 'react-redux';
import {
  Button,
  FormGroup,
  Form,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap';
import {Link, Route, Redirect} from 'react-router-dom';
import swal from 'sweetalert'
import api from '../api';

function LoginForm(props) {

  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({type: 'UPDATE_LOGIN_FORM', data: data});
  }

  function create_token(ev) {
    api.submit_login(props.login, props.history);
  }

  return <div
         className="d-flex align-items-center justify-content-center h-100 py-5 loginBackground">
    <div className="d-flex flex-column pt-4 mx-auto">
      <h3><strong>Welcome to your Next Bus Tracking Application</strong></h3>
      <div className="row justify-content-center">
        <Form className="mt-4 pt-4">
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText className="material-icons">
                  email
                </InputGroupText>
              </InputGroupAddon>
              <Input type="text" name="email" placeholder="email" value={props.login.email} onChange={update}/>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText className="material-icons">
                  lock
                </InputGroupText>
              </InputGroupAddon>
              <Input type="password" name="pass" placeholder="password" value={props.login.pass} onChange={update}/>
            </InputGroup>
          </FormGroup>
          <FormGroup className="text-center pt-3">
            <Button className="mr-2 text-center" color="primary" onClick={create_token}>Log In</Button>
            <Link to="/register" className="btn btn-secondary  text-center" color="secondary">Register</Link>
          </FormGroup>
        </Form>
      </div>
      {/* <div class="wrapper">
        <ul class="StepProgress">
          <li class="StepProgress-item is-done">
        <strong>Station1</strong>
          </li>
          <li class="StepProgress-item is-done">
        <strong>Award an entry</strong>
        Current station
          </li>
          <li class="StepProgress-item is-done">
        <strong>Station1</strong>
          </li>
          <li class="StepProgress-item is-done">
        <strong>Station1</strong>
          </li>
          <li class="StepProgress-item is-done">
        <strong>Station1</strong>
          </li>
          <li class="StepProgress-item current">
        <strong>Station1</strong>
          </li>
          <li class="StepProgress-item current">
        <strong>Station1</strong>
          </li>
          <li class="StepProgress-item">
        <strong>Station1</strong>
          </li>
          <li class="StepProgress-item is-done">
        <strong>Handover</strong>
          </li>
          <li class="StepProgress-item current">
        <strong>Provide feedback</strong>
          </li>
        </ul>
      </div> */}
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
