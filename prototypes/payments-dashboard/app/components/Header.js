let React = require("react");
let headerStyles = require("../scss/header.scss");

let Header = React.createClass({
  render: function() {
    return (
      <div className="block-header">
        <div className="block-header__inner">
          <a className="block-header-logo" href="/"></a>
          <div className="block-header-search"></div>
          <a className="block-header-menu" href="/"></a>
        </div>
      </div>
    )
  }
});

module.exports = Header;
