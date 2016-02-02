import React, { Component } from 'react'
import { Router, Route , IndexRoute} from 'react-router'

import App from './App'
import Inbox from "./Inbox"
import Sent from "./Sent"

let Root = React.createClass({
  render() {
    return (
      <Router>
        <Route path='/' component={App}>
          <IndexRoute component={Inbox} />
          <Route path="inbox" component={Inbox} />
          <Route path="sent" component={Sent} />
        </Route>
      </Router>
    );
  }
});

module.exports = Root;
