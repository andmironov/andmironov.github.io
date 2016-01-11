let React = require("react");
let Header = require("./components/Header.js");
let Sidebar = require("./components/Sidebar.js");
let Footer = require("./components/Footer.js");
let Graphs = require("./components/Graphs.js");

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
      <div>
        <Header/>
        <div className="mainSection">
          <Sidebar/>
          <Graphs/>
        </div>
        <Footer/>
      </div>
    )
  }
});

module.exports = App;
