import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import App from './App'
import Mail from "./Mail"
import Folder from "./Folder"

let Root = React.createClass({
  render() {
    return (
      <Router>
        <Route path='/' component={App}>
          <Route path="mail" component={Mail}>
            <Route name="folder" path="folder/:folderName" component={Folder} />
          </Route>
        </Route>
      </Router>
    );
  }
});

module.exports = Root;
