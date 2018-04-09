import React from 'react';
import {connect} from 'react-redux';
import {Button, FormGroup, Form, Label, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import {Link, Route, Redirect} from 'react-router-dom';
import swal from 'sweetalert'
import api from '../api';

function LoginForm(props) {

  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }


  function create_token(ev) {
    api.submit_login(props.login,props.history);    }


    return <div className="d-flex align-items-center justify-content-center h-100 py-5">
      <div className="d-flex flex-column mx-auto">
        <h3>Welcome to your Next Bus Tracking Application</h3>
      <div className="row justify-content-center">
        <Form className="mt-4">
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText className="material-icons">
                  email
                </InputGroupText>
              </InputGroupAddon>
              <Input type="text" name="email" placeholder="email"
                value={props.login.email}  onChange={update} />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText className="material-icons">
                  lock
                </InputGroupText>
              </InputGroupAddon>
              <Input type="password" name="pass" placeholder="password"
                value={props.login.pass} onChange={update} />
            </InputGroup>
          </FormGroup>
          <FormGroup className="text-center">
            <Button className="mr-2 text-center" color="primary" onClick={create_token}>Log In</Button>
          <Link to="/register" className="btn btn-secondary  text-center" color="secondary">Register</Link>
      </FormGroup>
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
