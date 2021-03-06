import React from "react"

let BackButton = React.createClass({

  render: function() {
    return (
      <div className="back-button">
        <div className="back-button__icon">
          <svg><g><rect opacity="0" width="20" height="20"></rect><path d="M7.82842712,9.98500013 L14.8994949,3.33083336 L13.4852814,2 L5.70710678,9.31958346 L5,9.98500013 L13.4852814,17.9700003 L14.8994949,16.6391669 L7.82842712,9.98500013 L7.82842712,9.98500013 L7.82842712,9.98500013 L7.82842712,9.98500013 Z"></path></g></svg>
        </div>
      </div>
    )
  }
})

module.exports = BackButton
