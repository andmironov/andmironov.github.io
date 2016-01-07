let React = require("react");

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
        Hello
      </div>
    )
  }
});

React.render(<App/>, document.getElementById("app"));
module.exports = App;
