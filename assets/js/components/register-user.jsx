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
import swal from 'sweetalert';
import api from '../api';
import {withRouter} from "react-router-dom";

function LoginForm(props) {

  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({type: 'UPDATE_REGISTER_FORM', data: data});
  }

  function create_token(ev) {
    var emptyRegex = new RegExp(/^\s+$/);
    var emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    var passRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    var phoneRegex = new RegExp(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g);
    var email = props.register.emailid;
    var pass = props.register.password;
    var name = props.register.username;
    var phone = props.register.phonenum;
    if((emptyRegex.test(email) || email == "") && (emptyRegex.test(pass) || pass == "")
    && (emptyRegex.test(name) || name == "") && (emptyRegex.test(phone) || phone == "")){
      swal("None of the field should be empty");
    }
    else if(emptyRegex.test(email) || email == ""){
      swal("Email field can't be empty");
    }
    else if(emptyRegex.test(pass) || pass == ""){
      swal("Password field can't be empty");
    }
    else if(emptyRegex.test(name) || name == ""){
      swal("Name field can't be empty");
    }
    else if(emptyRegex.test(phone) || phone == ""){
      swal("Phone number can't be empty");
    }
    else if(!emailRegex.test(email))
    {
      swal("That's an invalid email format.");
    }

    else if(!passRegex.test(pass)){
      swal("Your password must contain Following: \n" +
      "Atleast 8 Characters,\n" +
      "Atleast one Capital letter,\n" +
      "Atleast one Small Letter,\n" +
      "Atleast one digit, \n" +
      "Atleast one special character");
    }
    else if(!phoneRegex.test(phone) || phone.replace(/ /g,'').length <10){
      swal("Enter at least 10 digit phone number of format +1.XXX.XXX.XXXX or +1 XXX XXX XXXX");
    }
    else{
      api.create_user(props.register, props.history);
  }
  }

  return <div className="d-flex  h-100 py-5 loginBackground">
    <div className="d-flex flex-column mx-auto">
      <h3 className="text-center font-weight-bold h3 pt-3">Register to Bus Tracker App</h3>
      <div className="row justify-content-center">

        <Form className="mt-4">

          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText className="material-icons">
                  account_box
                </InputGroupText>
              </InputGroupAddon>
              <Input type="text" name="username" placeholder="name" value={props.register.username} onChange={update}/>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText className="material-icons">
                  email
                </InputGroupText>
              </InputGroupAddon>
              <Input type="email" name="emailid" placeholder="email" value={props.register.emailid} onChange={update}/>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText className="material-icons">
                  lock
                </InputGroupText>
              </InputGroupAddon>
              <Input type="password" name="password" placeholder="password" value={props.register.password} onChange={update}/>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText className="material-icons">
                  phone
                </InputGroupText>
              </InputGroupAddon>
              <Input type="number" name="phonenum" placeholder="phone" value={props.register.phonenum} onChange={update}/>
            </InputGroup>
          </FormGroup>

          <FormGroup className="text-center">
            <Button className="mr-2" color="primary" onClick={create_token}>Register</Button>
            <Link to="/" className="btn btn-secondary  text-center" color="secondary">Back to Login</Link>
          </FormGroup>
        </Form>
      </div>
    </div>
  </div>;
}

// Export the result of a curried function call.
export default withRouter(LoginForm);

//Source: http://www.ccs.neu.edu/home/ntuck/courses/2018/01/cs4550/notes/20-redux/notes.html
