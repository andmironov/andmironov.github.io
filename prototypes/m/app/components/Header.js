let React = require("react");

let Header = React.createClass({
  render: function() {
    return (
      <div className="header">
        <div className="header__inner">
          <a className="header-logo" href="/"></a>
          <div className="header-search"></div>
          <a className="header-menu" href="/"></a>
        </div>
      </div>
    )
  }
});

module.exports = Header;
