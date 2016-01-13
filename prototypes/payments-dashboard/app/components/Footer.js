let React = require("react");
let footerStyles = require("../scss/footer.scss");


let Footer = React.createClass({
  render: function() {
    return (
      <div className="footer">
        <div className="footer__inner">
          Footer
        </div>
      </div>
    )
  }
});

module.exports = Footer;
