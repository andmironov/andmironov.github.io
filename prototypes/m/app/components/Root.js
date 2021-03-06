import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import App from './App'
import Mail from "./Mail"
import Folder from "./Folder"
import Filter from "./Filter"
import Compose from "./Compose"
import Single from "./Single"

let Root = React.createClass({
  render() {
    return (
      <Router>
        <Route path='/' component={App}>
          <Route path="mail" component={Mail}>
            <Route name="compose" path="compose" component={Compose} />

            <Route name="single" path="single" component={Single} />
            <Route name="single" path="single/:messageId" component={Single} />

            <Route name="filter" path="filter/:filterType" component={Filter} />
            <Route name="filter" path="filter/:filterType/:filterName" component={Filter} />
          </Route>
        </Route>
      </Router>
    );
  }
});

module.exports = Root
