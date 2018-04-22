import React, {Component} from 'react';
import {AutoComplete} from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import api from '../api';
import swal from 'sweetalert';
import {connect} from 'react-redux';
import {Button} from 'reactstrap';
import Results from './results';

// Code referenced from http://hackingbeauty.com/create-a-reactjs-component-part1/
class MaterialUIAutocomplete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            from: '',
            to: '',
        }
    }

    componentDidMount() {
        if (this.props.auto_bus_stops.auto_bus_stops.length === 0)
            api.fetch_auto_bus_stops(this.props.session.channel);

        api.fetch_favourites(this.props.session.channel);
    }

    updateFrom(data, index) {
        this.setState(Object.assign({}, this.state, {from: data.stop_id}));
    }

    updateTo(data, index) {
        this.setState(Object.assign({}, this.state, {to: data.stop_id}));
    }

    componentWillUnmount()  {
        this.props.dispatch({
            type: "CLEAR_RESULTS",
        })
    }

    render() {
        var v = this.props.auto_bus_stops.auto_bus_stops

        return <div className="d-flex h-100 py-5">
            <div className="d-flex flex-column mx-auto">
                From: <MuiThemeProvider muiTheme={getMuiTheme()}><AutoComplete name="from" dataSource={v}
                                                                               dataSourceConfig={{
                                                                                   text: 'stop_name',
                                                                                   value: 'stop_id'
                                                                               }} maxSearchResults={10}
                                                                               onNewRequest={this.updateFrom.bind(this)}/></MuiThemeProvider>
                To: <MuiThemeProvider muiTheme={getMuiTheme()}><AutoComplete name="to" dataSource={v}
                                                                             dataSourceConfig={{
                                                                                 text: 'stop_name',
                                                                                 value: 'stop_id'
                                                                             }} maxSearchResults={10}
                                                                             onNewRequest={this.updateTo.bind(this)}/></MuiThemeProvider>
                <Button onClick={this.fireRequest.bind(this)}>Submit</Button>
                <Results session={this.props.session} favs={this.props.favs} results={this.props.results}/>
            </div>
        </div>;
    }

    fireRequest() {
        if (this.state.to === '' && this.state.from === '') {
            swal("Please Enter To and From fields");
            return;
        }

        api.fetch_results(this.props.session.channel, {from: this.state.from, to: this.state.to});
    }
}

export default connect(({auto_bus_stops, session, results, favourite}) => {
    return Object.assign({}, {auto_bus_stops: auto_bus_stops}, {session: session}, {results: results}, {favs: favourite.favs})
})(MaterialUIAutocomplete)