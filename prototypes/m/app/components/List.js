import React from "react"
import ListItem from "./ListItem"
let ReactPropTypes = React.PropTypes;

let List = React.createClass({

  propTypes: {
    letters: ReactPropTypes.array,
  },

  render: function() {
    let letters = this.props.letters;

    let listItems = letters.map(function(letter) {
      return <ListItem letter={letter} key={letter.id}/>
    })

    return (
      <div className="list">
        {listItems}
      </div>
    )
  }
});

module.exports = List;
