import React from 'react';
import {connect} from 'react-redux';
import LoggedOut from '../components/logged-out';
import LoggedIn from '../components/logged-in';
import api from '../api';

class Index extends React.Component {

    componentDidMount() {
        api.reconnect();
    }
    render()    {

        if (this.props.session)    {
            return <LoggedIn
            profile={this.props.profile}
            history={this.props.history}
            session={this.props.session}
            />;
        }
        else    {
            return <LoggedOut login={this.props.login} dispatch={this.props.dispatch}
                   register={this.props.register} />
        }
    }
}

export default connect(state => state)(Index);


