import React from 'react';
import {connect} from 'react-redux';
import {Accordion, AccordionItem} from 'react-sanfona';
import api from '../api';
import Bus from './bus';
import {Button} from 'reactstrap';

class favouriteview extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    api.fetch_favourites_live_info(this.props.channel);
  }

  addfav(route_id,e) {
    e.stopPropagation();
      var data = {"route_id": route_id};
      api.addFavourite(props.channel, data);
  }

  delfav(route_id,e) {
      e.stopPropagation();
      var data = {"route_id": route_id};
      api.removeFavourite(props.channel, data);
  }

  render() {

    return <div className="mt-5">
      <div className="d-flex h-100">
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="row justify-content-center w-100">
            {this.props.favs_live.length == 0
              ?
                <div>
                You haven't added any Favourites</div>
              :
              <Accordion>
                {
                  this.props.favs_live.map((fav, index) => {
                    return (
                      <AccordionItem key={fav.route_id}
                        title={ "Route Number:" + fav.route_id}
                        expanded={fav === 1}
                        className="card accordiontitle" key={index}>
                        <div className="card-body">
                          {
                            fav.buses.length === 0 ?
                              <div>No Buses are currently running in this route</div> :
                              fav.buses.map((bus, index2) => {
                                return <Bus channel={this.props.channel} bus={bus} key={index2}/>
                              })
                          }
                        </div>
                      </AccordionItem>);
                  })
                }
              </Accordion>
            }
          </div>
        </div>
      </div>
    </div>
  }
}

export default connect(({session, favourite}) => {
  return Object.assign({}, session, {favs_live: favourite.favs_live});
})(favouriteview);
