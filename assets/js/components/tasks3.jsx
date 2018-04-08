import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {
  Button,
  FormGroup,
  Form,
  Label,
  Input,
  Alert
} from 'reactstrap';
import {Link} from 'react-router-dom';

import Nav from './nav';
import Feed from './feed';
import Users from './users';
import PostForm from './post-form';
import LoginForm from './login-form';
import EditTask from './edit-task';
import RegisterTask from './register-task'

import api from '../api';

export default function tasks3_init(store) {
  ReactDOM.render(<Provider store={store}>
    <Tasks3 state={store.getState()}/>
  </Provider>, document.getElementById('root'),);
}

let Tasks3 = connect((state) => state)((props) => {

  return (<Router>
    <div>


      <Route path="/register" exact={true} render={({history}) => <div>
          <RegisterTask register={props.register} history={history} />
          </div>}/>
      <Route path="/" exact={true} render={({history}) =>< div > <LoginForm login={props.login} history={history}/>
        <script>
          document.getElementById("alertlogin").style.visibility = "hidden";
        </script>
      </div>}/> {
        props.token
          ? <div><Nav/>
        <Route path="/feed" exact={true} render={() => <div>
                  <Feed tasks={_.filter(props.tasks, (pp) => props.token.user_id == pp.user.id)}/>
                </div>}/>
              <Route path="/users" exact={true} render={() => <Users users={props.users}/>}/>
              <Route path="/users/:user_id" render={({match}) => <Feed tasks={_.filter(props.tasks, (pp) => match.params.user_id == pp.user.id)}/>}/>
              <Route path="/tasks/new" exact={true} render={({match, history}) => <PostForm users={props.users} history={history}/>}/>
              <Route path="/tasks/edit/:task_id" exact={true} render={({match, history}) => <EditTask users={props.users} history={history}/>}/>
            </div>
          : <div id="alertlogin" className="text-center">
            <Alert color="light">
              Your session expired
              <Link to="/" className="btn btn-link" color="primary">
                Login Again
              </Link>
            </Alert>
          </div>
      }
      </div>
  </Router>);
});
