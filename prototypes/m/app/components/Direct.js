let React = require("react");

let Direct = React.createClass({
  render: function() {
    return (
          <div className="direct">
            <div className="direct__title">Мужская обувь в магазине ECCO</div>
            <div className="direct__desctiption">Получите скидку 500р на покупку женской обуви ECCO</div>
            <div className="direct__provider">Яндекс.Директ</div>
          </div>
    )
  }
});

module.exports = Direct;
