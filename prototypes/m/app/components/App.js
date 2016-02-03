import React from 'react'

//Components
import AppContainer from "./AppContainer.js"
import Topline from "./Topline.js"
import Header from "./Header.js"
import Footer from "./Footer.js"

//Styles
import mainStyles from "../scss/main.scss"

let App = React.createClass({
  render: function() {
    return (
      <AppContainer>
        <Topline/>
        <Header/>
        {this.props.children}
        <Footer/>
      </AppContainer>
    )
  }
});

module.exports = App;
