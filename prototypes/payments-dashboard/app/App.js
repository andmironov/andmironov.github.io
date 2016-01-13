let React = require("react");
let Header = require("./components/Header.js");
let Sidebar = require("./components/Sidebar.js");
let Footer = require("./components/Footer.js");
let Graphs = require("./components/Graphs.js");
let mainSectionStyles = require("./scss/mainSection.scss");

let App = React.createClass({

  getInitialState: function() {
    return {
      user : {
        image : "./chris.jpg",
        name : "Christophe",
        surname : "Tauziet",
        fullName : "Christophe Tauziet"
      }
    }
  },

  componentDidMount: function() {
  },

  componentWillUnmount: function() {
  },

  render: function() {
    return (
      <div className="app-container">
        <Header/>
        <div className="main-section">
          <div className="main-section__inner">
            <Sidebar user={this.state.user}/>
            <Graphs/>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
});

module.exports = App;
