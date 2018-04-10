import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Nav} from './nav'
class LoggedIn extends React.Component {

    constructor(props)  {
        super(props);
    }

    componentDidMount() {
        // TODO
        // Fetch the socket from store and connect to channels
    }

    render()    {
        return <Router>
            <Nav />
            <Route path="/feed" exact={true} render={() => <div>
                <Feed tasks={_.filter(props.tasks, (pp) => props.token.user_id == pp.user.id)}/>
            </div>}/>
            <Route path="/tasks/new" exact={true} render={({match, history}) => <PostForm users={props.users} history={history}/>}/>
            <Route path="/tasks/edit/:task_id" exact={true} render={({match, history}) => <EditTask users={props.users} history={history}/>}/>
        </Router>;
    }

}