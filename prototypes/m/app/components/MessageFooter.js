import React from 'react'
let ReactPropTypes = React.PropTypes

let MessageFooter = React.createClass({

  propTypes: {
    message: ReactPropTypes.object
  },

  render: function() {
    return (
      <div className="message-footer">

      </div>
    )
  }
});
module.exports = MessageFooter;
