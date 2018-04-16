import React from 'react';
import {connect} from 'react-redux';
import LoggedOut from '../components/logged-out';
import LoggedIn from '../components/logged-in';
import api from '../api';
import {withRouter} from "react-router-dom";

class Index extends React.Component {

    componentDidMount() {
        api.reconnect();
    }
    render()    {

        if (this.props.session)    {
            return <LoggedIn
            profile={this.props.profile}
            session={this.props.session}
            dispatch={this.props.dispatch}
            listStops={this.props.listStops}
            />;
        }
        else    {
            window.history.pushState({}, "", "/");
            return <LoggedOut login={this.props.login} dispatch={this.props.dispatch}
                   register={this.props.register} />
        }
    }
}

export default connect(state => state)(Index);


