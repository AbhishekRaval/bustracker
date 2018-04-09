import {BrowserRouter as Router, Route} from 'react-router-dom';

export default function LoggedIn(props) {
    return <Router>
            <Nav />
            <Route path="/feed" exact={true} render={() => <div>
                <Feed tasks={_.filter(props.tasks, (pp) => props.token.user_id == pp.user.id)}/>
            </div>}/>
            <Route path="/tasks/new" exact={true} render={({match, history}) => <PostForm users={props.users} history={history}/>}/>
            <Route path="/tasks/edit/:task_id" exact={true} render={({match, history}) => <EditTask users={props.users} history={history}/>}/>
    </Router>;
}