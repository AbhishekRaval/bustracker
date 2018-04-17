import React from 'react';
import {connect} from 'react-redux';
import {Accordion, AccordionItem} from 'react-sanfona';
import api from '../api';

class favouriteview extends React.Component {

    constructor(props)  {
        super(props);
    }

    componentDidMount() {
        api.fetch_favourites_live_info(this.props.channel);
    }

    render()
    {
        console.log(this.props);
        return <div>
            <div className="d-flex h-100">
                <div className="d-flex flex-column mx-auto py-2 w-100">
                    <Accordion>
                        {
                            this.props.favs.map(fav => {
                                return (
                                    <AccordionItem title={fav.route_id} expanded={fav === 1}
                                                   className="card accordiontitle"
                                                   key={fav.route_id}>
                                    </AccordionItem>);
                            })
                        }
                    </Accordion>
                </div>
            </div>
        </div>
    }
}

export default connect(({session, profile}) => Object.assign({}, profile, session))(favouriteview);





