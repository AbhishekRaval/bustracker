import React from 'react';
import {connect} from 'react-redux';
import LoggedOut from '../components/logged-out';
import LoggedIn from '../components/logged-in';

class Index extends React.Component {
    render()    {

        console.log(this.props);
        if (this.props.token)    {
            return <LoggedIn history={this.props.history}/>
        }
        else    {
            return <LoggedOut login={this.props.login} history={this.props.history}
                   register={this.props.register} />
        }
    }
}

export default connect(({token, login, register}) =>
{return Object.assign({}, {token: token}, {login: login}, {register: register});})(Index);


