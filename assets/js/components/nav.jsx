import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import {Form, FormGroup, NavItem, Input, Button} from 'reactstrap';
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

    return <div className="navbar-text">
        Logged in as: {props.name} |
        <Link to="/" className="ml-2 text-white btn btn-link" onClick={logout}>Logout</Link>
    </div>;
}

function Nav(props) {

    let session_info = <Session name={props.name} socket={props.socket} history={props.history}/>;

    return (
        <nav className="navbar navbar-dark bg-blue navbar-expand">
          <NavLink to="/" exact={true} activeClassName="active"  className="navbar-brand h1">
        BusTracker
          </NavLink>
            <ul className="navbar-nav mr-auto">
                <NavItem>
                    <NavLink to="/search" exact={true} activeClassName="active" className="nav-link">Search Bus</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/favourites" href="#" className="nav-link">Favs</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/to-from/" href="#" className="nav-link">Search Between Stops</NavLink>
                </NavItem>
            </ul>
            {session_info}
        </nav>
    );
}

export default withRouter(Nav);