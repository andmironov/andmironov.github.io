import React from 'react'
let ReactPropTypes = React.PropTypes

let MessageHeader = React.createClass({

  propTypes: {
    message: ReactPropTypes.object
  },

  render: function() {
    return (
      <div className="message-header">
        <h2  className="message-subject">{this.props.message.subject}</h2>
        <div className="message-date">{this.props.message.date}</div>
        <div className="message-info">
          <div className="message-avatar"></div>
          <div className="message-contacts">
            <div className="message-from">
              <span className="message-from__name">{this.props.message.from.name}</span> <span className="message-from__email">{this.props.message.from.email}</span>
            </div>
            <div className="message-to">
              <span className="message-to__label">Кому:</span> <span className="message-to__names">мне</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
module.exports = MessageHeader
