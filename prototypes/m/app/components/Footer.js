let React = require("react");

let Footer = React.createClass({
  render: function() {
    return (
      <div className="footer">
        <div className="footer__inner">

          <div className="footer-block footer-block_sidebar">
          </div>

          <ul className="footer-links footer-block footer-block_main">
            <li><a href="/">Помощь</a></li>
            <li><a href="/">Обратная связь</a></li>
            <li><a href="/">Политика конфиденциальности</a></li>
          </ul>

          <ul className="footer-links footer-block footer-block_secondary">
            <li>&copy; Рамблер</li>
          </ul>

        </div>
      </div>
    )
  }
});

module.exports = Footer;
