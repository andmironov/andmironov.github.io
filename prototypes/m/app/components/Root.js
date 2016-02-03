import React, { Component } from 'react'
import { Router, Route , IndexRoute} from 'react-router'

import App from './App'
import List from "./List"
import Inbox from "./Inbox"
import Sent from "./Sent"

let Root = React.createClass({
  render() {
    return (
      <Router>
        <Route path='/' component={App}>
          <Route path="list" component={List}>
            <Route path="inbox" component={Inbox} />
            <Route path="sent" component={Sent} />
          </Route>
        </Route>
      </Router>
    );
  }
});

module.exports = Root;
