import React from 'react';
import {connect} from 'react-redux';
import {Accordion, AccordionItem} from 'react-sanfona';
import api from '../api';
import Bus from './bus';

class favouriteview extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        api.fetch_favourites_live_info(this.props.channel);
    }

    render() {
        console.log(this.props);
        return <div>
            <div className="d-flex h-100">
                <div className="d-flex flex-column mx-auto py-2 w-100">
                    <Accordion>
                        {
                            this.props.favs_live.map(fav => {
                                return (
                                    <AccordionItem title={fav.route_id} expanded={fav === 1}
                                                   className="card accordiontitle"
                                                   key={fav.route_id}>
                                        <div className="card-body">
                                            <div className="list-group">
                                                {
                                                    fav.buses.length === 0 ?
                                                        <div>No Buses currently running in this route</div>
                                                        :
                                                        fav.buses.map(bus => {
                                                            return <Bus channel={this.props.channel} bus={bus}/>
                                                        })
                                                }
                                            </div>
                                        </div>
                                    </AccordionItem>);
                            })
                        }
                    </Accordion>
                </div>
            </div>
        </div>
    }
}

export default connect(({session, favourite}) => {
    return Object.assign({}, session, {favs_live: favourite.favs_live});
})(favouriteview);





