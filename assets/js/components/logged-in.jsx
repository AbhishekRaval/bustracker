import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Nav from './nav';
import {SearchBus} from "./searchbus";
import {Accordion, AccordionItem} from 'react-sanfona';
import FavouriteView from './favourites';
import BusTracking from './bus-tracking';
import Map from './map';
export default class LoggedIn extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {channel} = this.props.session;
    channel.push("profile").receive("ok", resp => {
      this.props.dispatch({type: "SET_PROFILE", profile: resp.profile});
    });
  }

    render() {
        console.log(this.props);
        return <Router>
          <div className="container2">
            <Nav name={this.props.profile.username} socket={this.props.session.socket} history={this.props.history} />
            <Route path="/" exact={true} render={() => {
                return <div className="h-25 w-25"><div className="row justify-content-center mt-2"><Map /></div></div>;
                }}/>
                <Route path="/favourites" exact={true} render={() => <FavouriteView />}/>
                <Route path="/search" exact={true} render={() => <SearchBus channel={this.props.session.channel}
                                                                            dispatch={this.props.dispatch}
                                                                            listStops={this.props.listStops}
                                                                            favs={this.props.favourite.favs} /> } />
                <Route path="/buses/:id" exact={true}
                       render={(props) => <BusTracking bus_id={props.match.params.id} />}/>
            </div>
        </Router>;
    }
}
