import React from 'react'
import User from "./User"

let Topline = React.createClass({
  render: function() {
    return (
      <div className="topline">
        <div className="topline__inner">
          <ul className="product-list">
            <li className="product-list__item"><a href="#">Новости</a></li>
            <li className="product-list__item"><a href="#">Авторамблер</a></li>
            <li className="product-list__item"><a href="#">Супермаркет</a></li>
            <li className="product-list__item"><a href="#">Недвижимость</a></li>
            <li className="product-list__item"><a href="#">Знакомства</a></li>
            <li className="product-list__item"><a href="#">Погода</a></li>
          </ul>
          <User/>
        </div>
      </div>
    )
  }
});

module.exports = Topline;
