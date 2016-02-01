import React from 'react'

let Header = React.createClass({
  render: function() {
    return (
      <div className="header">
        <div className="header__inner">

          <div className="logo-wrap">
            <a className="logo" href="/"></a>
          </div>

          <ul className="menu">
            <li className="menu__item"><a href="#">Почта</a></li>
            <li className="menu__item"><a href="#">Адресная книга</a></li>
            <li className="menu__item"><a href="#">Список дел</a></li>
            <li className="menu__item"><a href="#">Файлы</a></li>
          </ul>

          <div className="settings"><a href="#">Настройка</a></div>
        </div>
      </div>
    )
  }
});

module.exports = Header;
