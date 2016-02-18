import React from "react"
import List from "./List"
import FolderHeader from "./FolderHeader"
import FolderHeaderSticky from "./FolderHeaderSticky"
import Direct from "./Direct"
let ReactPropTypes = React.PropTypes

let Filter = React.createClass({

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
    let currentFilterType = this.props.params.filterType

    console.log(allLetters);
    let letters = this._getFilteredLetters(allLetters, "starred")

    return (
      <div className="folder">
        <FolderHeader {...this.props} />
        <FolderHeaderSticky {...this.props} />
        <Direct/>
        <List letters={letters} areSomeChecked={this.props.areSomeChecked} />
      </div>
    )
  },

  _getFilteredLetters: function(letters, filterType) {
    let fileredLetters

    switch (filterType) {
      case "starred":
      console.log(letters);
        fileredLetters = letters.filter(function(item) {
          return item.faved == true
        })
      break
    }
    return fileredLetters
  }

})

module.exports = Filter
