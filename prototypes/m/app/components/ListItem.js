let React = require("react");
let classNames = require("classnames");

let ListItem = React.createClass({

  getInitialState: function() {
    return {
        isNew : this.props.new,
        isChecked : this.props.checked,
        isFaved : this.props.faved,
        sender : this.props.sender,
        subject : this.props.subject,
        snippet : this.props.snippet,
        date : this.props.date
    }
  },

  toggleChecked: function() {
    this.setState({
      isChecked: this.state.isChecked ? false : true,
    });
  },

  toggleFaved: function() {
    this.setState({
      isFaved: this.state.isFaved ? false : true,
    });
  },

  render: function() {

    let letterClassnames = classNames({
      'letter': true,
      'letter_new': this.state.isNew,
      'letter_checked': this.state.isChecked,
      'letter_faved': this.state.isFaved
    });

    return (
      <div className={letterClassnames}>
        <div className="letter__checkbox" onClick={this.toggleChecked}>
        <svg viewBox="0 0 9 7" className="letter__checkbox-tick"><path d="M3.18937182,6.75830078 L0,3.46309132 L1.01985037,2.44324095 L3.18937178,4.80468826 L7.99406007,0 L9.05960657,1.06554661 L3.18937182,6.75830078 Z" ></path></svg>
        </div>
        <div className="letter__star" onClick={this.toggleFaved}>
          <svg viewBox="0 0 14 13"><polygon points="7 10.5 2.88550323 12.663119 3.67130219 8.08155948 0.342604386 4.83688104 4.94275162 4.16844052 7 0 9.05724838 4.16844052 13.6573956 4.83688104 10.3286978 8.08155948 11.1144968 12.663119 "></polygon></svg>
        </div>
        <div className="letter__sender">{this.state.sender}</div>
        <div className="letter__subject">{this.state.subject}</div>
        <div className="letter__snippet">{this.state.snippet}</div>
        <div className="letter__date">{this.state.date}</div>
      </div>
    )
  }
});

module.exports = ListItem;
