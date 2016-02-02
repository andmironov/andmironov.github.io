import React from 'react'

//Components
import Topline from "./Topline.js"
import Header from "./Header.js"
import Sidebar from "./Sidebar.js"
import Footer from "./Footer.js"

//Pages
import Inbox from "./Inbox.js"
import Sent from "./Sent.js"

//Styles
import mainStyles from "../scss/main.scss"

let App = React.createClass({

  getInitialState: function() {
    return {}
  },

  componentDidMount: function() {
  },

  componentWillUnmount: function() {
  },

  render: function() {
    return (
      <div className="app-container">
        <Topline/>
        <Header/>
        <div className="main-section">
          <Sidebar/>
          {this.props.children}
        </div>
        <Footer/>
      </div>
    )
  }
});

module.exports = App;
