import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import IndexView from '../views/index';


export default function bus_tracker_init(store) {
  ReactDOM.render(<Provider store={store}>
    <IndexView />
  </Provider>, document.getElementById('root'),);
}