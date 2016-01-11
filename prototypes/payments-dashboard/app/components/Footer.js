let React = require("react");
let footerStyles = require("../scss/footer.scss");


let Footer = React.createClass({
  render: function() {
    return (
      <div className="block-footer">
        <div className="block-footer__inner">
          Footer
        </div>
      </div>
    )
  }
});

module.exports = Footer;
