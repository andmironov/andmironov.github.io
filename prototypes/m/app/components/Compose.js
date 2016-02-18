import React from "react"
import ComposeForm from "./ComposeForm"
let ReactPropTypes = React.PropTypes

let Compose = React.createClass({

  propTypes: {
    params: ReactPropTypes.object
  },

  render: function() {
    let folderName = this.props.params.folderName

    return (
      <div className="compose">
        <ComposeForm/>
      </div>
    )
  }
})

module.exports = Compose
