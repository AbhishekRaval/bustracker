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
                return<div className="flex justify-content-center mt-4 text-dark">
                        <h3>Welcome to MBTA Bus Tracker Application.</h3>
                    <ul>
                    <li>Click on Search Bus to fetch buses near your Location, Make sure you allow location settings.</li>
                    <li>If you're on mobile, please turn on your GPS.</li>
                    <li>After Clicking on search bus, it will show you all the bus stos in your area, And all the routes accessible through it.
                    Please Favourite a route, to track it any time by clicking a star next to route. On clicking the route, it will show you all the buses.
                    You May Click Track button to track the bus</li>
                    </ul>
                        </div>;
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
