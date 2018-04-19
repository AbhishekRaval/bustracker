import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import {Form, FormGroup, NavItem, Input, Button,NavbarBrand} from 'reactstrap';
import {connect} from 'react-redux';
import api from '../api';
import {withRouter} from "react-router-dom";

let LoginForm = connect(({login}) => {
    return {login};
})((props) => {
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
        api.submit_login(props.login);
        console.log(props.login);
    }

    return <div className="navbar-text">
        <Form inline>
            <FormGroup>
                <Input type="text" name="email" placeholder="email"
                       value={props.login.email} onChange={update}/>
            </FormGroup>
            <FormGroup>
                <Input type="password" name="pass" placeholder="password"
                       value={props.login.pass} onChange={update}/>
            </FormGroup>
            <Button onClick={create_token}>Log In</Button>
        </Form>
    </div>;
});

export function Session(props) {

    function logout(ev) {
        api.logout(props.socket, props.history);
    }

    return  <span  className="nav-link">
             Logged in as: {props.name + " logout"}
        <NavItem className="text-white">
        <NavLink to="/"  className="nav-link" onClick={logout}>Logout</NavLink>
           </NavItem>
    </span>;
}

function Nav(props) {

    let session_info = <Session name={props.name} socket={props.socket} history={props.history}/>;

    return (
        <nav className="navbar navbar-dark bg-blue navbar-expand">
          <NavbarBrand  className=" text-white">
        BusTracker
      </NavbarBrand>
            <ul className="navbar-nav mr-auto">
                <NavItem>
                    <NavLink to="/search" exact={true} activeClassName="active" className="nav-link">Search Bus</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/favourites" href="#" className="nav-link">Favourites</NavLink>
                </NavItem>
                    {session_info}
            </ul>
        </nav>
    );
}

export default withRouter(Nav);