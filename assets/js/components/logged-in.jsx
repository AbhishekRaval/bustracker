import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Nav} from './nav';

export default class LoggedIn extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Fetch the socket from store and connect to channels
        const {channel} = this.props.session;
        channel.push("profile").receive("ok", resp => {
            this.props.dispatch({
                type: "SET_PROFILE",
                profile: resp.profile
            });
        });
    }

    render() {

        console.log(this.props);
        return <Router>
            <div>
                <Nav name={this.props.profile.username}/>
                <Route path="/" exact={true} render={() => {
                    return <div>This should be the profile page</div>;
                }}/>
                <Route path="/favourites" exact={true} render={() => <div>Favourites</div>}/>
                <Route path="search" exact={true} render={() => <div>Search Page</div>}/>
                <Route path="/buses/:id" exact={true}
                       render={() => <div>Bus Tracking information would be displayed here</div>}/>
            </div>
        </Router>;
    }
}