import React from 'react'
let ReactPropTypes = React.PropTypes

let MessageBody = React.createClass({

  propTypes: {
    message: ReactPropTypes.object
  },

  render: function() {
    return (
      <div className="message-body">
        {this.props.message.body}
      </div>
    )
  }
});
module.exports = MessageBody;
