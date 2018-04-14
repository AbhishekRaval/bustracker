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

export default function LoginForm(props) {

  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({type: 'UPDATE_LOGIN_FORM', data: data});
  }

  // function create_token(ev) {
  //   api.submit_login(props.login, props.history);
  // }

  function create_token(ev) {
      //Login Validation
      //Validating empty fields
      var emptyRegex = new RegExp(/^\s+$/);
      var emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
      var email = props.login.emailid;
      var pass = props.login.password;
      if((emptyRegex.test(email) || email == "") && (emptyRegex.test(pass) || pass == "")){
        swal("None of the field should be empty");
      }
      else if(emptyRegex.test(email) || email == ""){
        swal("Email field can't be empty");
      }
      else if(emptyRegex.test(pass) || pass == ""){
        swal("Password field can't be empty");
      }
      else if(!emailRegex.test(email))
      {
        swal("That's an invalid email format.");
      }
      else{
      api.submit_login(props.login, null);
    }
  }

  return <div className="d-flex h-100 py-5 loginBackground">
    <div className="d-flex flex-column pt-4 mx-auto">
      <h3>
        <strong>Welcome to your Next Bus Tracking Application</strong>
      </h3>
      <div className="row justify-content-center">
        <Form className="mt-4 pt-4">
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText className="material-icons">
                  email
                </InputGroupText>
              </InputGroupAddon>
              <Input type="text" name="emailid" placeholder="email" value={props.login.emailid} onChange={update}/>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText className="material-icons">
                  lock
                </InputGroupText>
              </InputGroupAddon>
              <Input type="password" name="password" placeholder="password" value={props.login.password} onChange={update}/>
            </InputGroup>
          </FormGroup>
          <FormGroup className="text-center pt-3">
            <Button className="mr-2 text-center" color="primary" onClick={create_token}>Log In</Button>
            <Link to="/register" className="btn btn-secondary  text-center" color="secondary">Register</Link>
          </FormGroup>
        </Form>
      </div>
    </div>
  </div>;
}

//Source: http://www.ccs.neu.edu/home/ntuck/courses/2018/01/cs4550/notes/20-redux/notes.html
