import React from 'react'
let AppContainer = React.createClass({
  render: function() {
    return (
      <div className="app-container">
        {this.props.children}
      </div>
    )
  }
});
module.exports = AppContainer;
