import React from "react"
import List from "./List"
import FolderHeader from "./FolderHeader"
import FolderHeaderSticky from "./FolderHeaderSticky"
import Direct from "./Direct"
let ReactPropTypes = React.PropTypes

let Folder = React.createClass({

  propTypes: {
    allLetters: ReactPropTypes.object,
    newLettersCount: ReactPropTypes.object,
    areAllChecked: ReactPropTypes.bool,
    areSomeChecked: ReactPropTypes.bool,
    checkedCount: ReactPropTypes.number,
    params: ReactPropTypes.object
  },

  render: function() {
    let allLetters = this.props.allLetters.letters
    let folderName = this.props.params.folderName

    let letters = allLetters.filter(function(item) {
      return item.folder == folderName
    })

    return (
      <div className="folder">
        <FolderHeader {...this.props} />
        <FolderHeaderSticky {...this.props} />
        <Direct/>
        <List letters={letters} areSomeChecked={this.props.areSomeChecked} />
      </div>
    )
  }
})

module.exports = Folder
