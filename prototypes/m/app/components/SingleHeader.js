import React from "react"
import BackButton from "./BackButton"
import SingleButtons from "./SingleButtons"
import SingleActions from "./SingleActions"

let SingleHeader = React.createClass({

  render: function() {
    return (
      <div className="folder-header">
        <BackButton/>
        <SingleButtons/>
        <SingleActions/>
      </div>
    )
  }
});

module.exports = SingleHeader;
