import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Nav from './nav';
import {SearchBus} from "./searchbus";
import FavouriteView from './favourites';
import BusTracking from './bus-tracking';
import Autocomplete from './autocomplete';

import {Link,  Redirect} from 'react-router-dom';
import { Card, CardBody, CardSubtitle, CardLink, CardTitle, CardText, CardImg } from 'reactstrap';
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

        return <Router>
          <div className="container2">
            <Nav name={this.props.profile.username} socket={this.props.session.socket} history={this.props.history} />
            <Route path="/" exact={true} render={() => {
                return <div className="d-flex align-items-start mt-3 justify-content-center h-100">
                    <div className="d-flex flex-column mx-auto">
                        <div className=" justify-content-center">
                        <h3>Welcome to MBTA Bus Tracker Application.</h3>
                    <ul className="card-body justify-content-center">
                        <CardBody className="w-100">
                    <li>Click on Search Bus to fetch buses near your Location, Make sure you allow location settings.</li>
                    <li>If you're on mobile, please turn on your GPS.</li>
                    <li>After Clicking on search bus, it will show you all the bus stos in your area, And all the routes accessible through it.
                    Please Favourite a route, to track it any time by clicking a star next to route. On clicking the route, it will show you all the buses.
                    You May Click Track button to track the bus</li>
                        </CardBody>
                    </ul>
                        </div>
                        <div className="row justify-content-center">
                            <Card style={{maxWidth: '50%'}} className="mx-5 col-sm-3 my-3 bg-card-home">
                                <CardTitle  className={"text-center pt-3"}>Show Buses near Me</CardTitle>
                                <CardBody className="justify-content-center">
                                <div  className="pl-2 pr-2">
                                <img width="85%" height="85%" src="images/location.png" alt="Card image cap" style={{
                                    display: 'block',
                                    marginLeft: 'auto',
                                    marginRight:'auto'}}/>
                                </div>
                                    <div className="row justify-content-center">
                                    <Link to="/search" className="btn btn-primary mt-3">Track Buses Near Me </Link>
                                    </div></CardBody>
                            </Card>
                            <Card style={{maxWidth: '50%'}} className="mx-5 col-sm-3 my-3 bg-card-home">
                                <CardTitle  className={"text-center pt-3"}>Fetch Buses Between Stops</CardTitle>
                                <CardBody className="justify-content-center">
                                    <div  className="pl-2 pr-2">
                                        <img width="85%" height="85%" src="images/trackbus.png" alt="Card image cap" style={{
                                            display: 'block',
                                            marginLeft: 'auto',
                                            marginRight:'auto'}}/>
                                    </div>
                                    <div className="row justify-content-center">
                                        <Link to="/to-from" className="btn btn-primary mt-3">Fetch Buses between stops</Link>
                                    </div></CardBody>

                            </Card>
                            <Card style={{maxWidth: '50%'}} className="mx-5 col-sm-3 my-3 bg-card-home">
                                <CardTitle  className={"text-center pt-3"}>Show My Favourite routes</CardTitle>
                                <CardBody className="justify-content-center">
                                    <div  className="pl-2 pr-2">
                                        <img width="85%" height="85%" src="images/favs.png" alt="Card image cap" style={{
                                            display: 'block',
                                            marginLeft: 'auto',
                                            marginRight:'auto'}}/>
                                    </div>
                                    <div className="row justify-content-center">
                                        <Link to="/favourites" className="btn btn-primary mt-3">My Favourites</Link>
                                    </div></CardBody>

                            </Card>
                        </div>
                    </div>
                     </div>;
                }}/>
                <Route path="/favourites" exact={true} render={() => <FavouriteView />}/>
                <Route path="/search" exact={true} render={() => <SearchBus channel={this.props.session.channel}
                                                                            dispatch={this.props.dispatch}
                                                                            listStops={this.props.listStops}
                                                                            favs={this.props.favourite.favs} /> } />
                <Route path="/buses/:id" exact={true}
                       render={(props) => <BusTracking bus_id={props.match.params.id} />}/>
                <Route path="/to-from/" exact={true} render={() => <Autocomplete />} />
            </div>
        </Router>;
    }
}
//Image1 source; Pinterest
//Image2source: https://herecomesthebus.com