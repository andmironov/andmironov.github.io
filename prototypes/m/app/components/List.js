import React from "react"
import ListItem from "./ListItem"
import classNames from "classnames"
let ReactPropTypes = React.PropTypes

let List = React.createClass({

  propTypes: {
    letters: ReactPropTypes.array,
    areSomeChecked: ReactPropTypes.bool
  },

  render: function() {
    let letters = this.props.letters;

    let listItems = letters.map(function(letter) {
      return <ListItem letter={letter} key={letter.id}/>
    })

    let listClassnames = classNames({
      'list': true,
      'list_some-are-checked': this.props.areSomeChecked
    })

    return (
      <div className={listClassnames}>
        {listItems}
      </div>
    )
  }
})

module.exports = List
