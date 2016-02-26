import React from "react"
import SingleHeader from "./SingleHeader"
import Direct from "./Direct"
import Message from "./Message"

let Single = React.createClass({

  getInitialState: function() {
    return {
      message : {
        id: 1,
        from: {
          name: "Aлексей Петров",
          email: "alexpetrov@rambler.ru"
        },
        date: "Сегодня в 16:32",
        subject: "Welcome to Chapter 1 of Making a Product Designer",
        body: "Привет! Хотел поинтересоваться, возможно ли все еще получить разрешение на охоту? Заранее спасибо!"
      },
    }
  },

  render: function() {

    return (
      <div className="single">
        <SingleHeader/>
        <Direct/>
        <Message message={this.state.message}/>
      </div>
    )
  }
})

module.exports = Single
