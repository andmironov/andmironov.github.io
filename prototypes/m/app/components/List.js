let React = require("react");

import Sidebar from "./Sidebar.js"

let lettersData = {
  letters: [
    {
      new: true,
      checked: false,
      faved: false,
      sender: "Алексей Петров",
      subject: "Разрешение на охоту",
      snippet: "Привет, хотел у вас узнать по поводу разрешения на охоту. Тут такое дело",
      date: "19:30"
    },
    {
      new: false,
      checked: false,
      faved: false,
      sender: "Slack notifications",
      subject: "Notifications 23-30 Dec",
      snippet: "Привет, хотел у вас узнать по поводу разрешения на охоту. Тут такое дело",
      date: "11:49"
    },
    {
      new: true,
      checked: false,
      faved: false,
      sender: "React Newsletter",
      subject: "React Newsletter - Issue 21",
      snippet: "Your weekly newsletter of the best React.js news, articles, projects and more. View on the web",
      date: "Вчера"
    },
    {
      new: true,
      checked: false,
      faved: false,
      sender: "MyFonts News",
      subject: "Creative Characters highlights from the last 99 issues",
      snippet: "MyFonts logo MyFonts: Creative Characters Highlights from the last 99 issues, January 2016 Read in a",
      date: "Вчера"
    },
    {
      new: true,
      checked: false,
      faved: false,
      sender: "М.Видео",
      subject: "Андрей, получите скидку 500 рублей и доступ к уникальным предложениям!",
      snippet: "Выберите свой Любимый магазин М.Видео Письмо не отображается корректно? Перейти на сайт М",
      date: "Вчера"
    },
    {
      new: false,
      checked: false,
      faved: false,
      sender: "PayPal",
      subject: "Скидка 10% на Farfetch.com только при оплате с PayPal",
      snippet: "Привет, хотел у вас узнать по поводу разрешения на охоту. Тут такое дело",
      date: "9 Дек"
    },
    {
      new: false,
      checked: false,
      faved: false,
      sender: "HeadHunter",
      subject: "Андрей, почему вы ушли с предыдущей работы?",
      snippet: "Поиск вакансий Отклики на вакансии Мы на мобильных Продвижение резюме Статьи> 5 причин неудач в",
      date: "9 Дек"
    },
    {
      new: false,
      checked: false,
      faved: false,
      sender: "Алексей Петров",
      subject: "Разрешение на охоту",
      snippet: "Привет, хотел у вас узнать по поводу разрешения на охоту. Тут такое дело",
      date: "19:30"
    },
    {
      new: false,
      checked: false,
      faved: false,
      sender: "Алексей Петров",
      subject: "Разрешение на охоту",
      snippet: "Привет, хотел у вас узнать по поводу разрешения на охоту. Тут такое дело",
      date: "19:30"
    },
    {
      new: false,
      checked: false,
      faved: false,
      sender: "Slack notifications",
      subject: "Notifications 23-30 Dec",
      snippet: "Привет, хотел у вас узнать по поводу разрешения на охоту. Тут такое дело",
      date: "11:49"
    },
    {
      new: false,
      checked: false,
      faved: false,
      sender: "React Newsletter",
      subject: "React Newsletter - Issue 21",
      snippet: "Your weekly newsletter of the best React.js news, articles, projects and more. View on the web",
      date: "Вчера"
    },
    {
      new: false,
      checked: false,
      faved: false,
      sender: "MyFonts News",
      subject: "Creative Characters highlights from the last 99 issues",
      snippet: "MyFonts logo MyFonts: Creative Characters Highlights from the last 99 issues, January 2016 Read in a",
      date: "Вчера"
    },
    {
      new: false,
      checked: false,
      faved: false,
      sender: "М.Видео",
      subject: "Андрей, получите скидку 500 рублей и доступ к уникальным предложениям!",
      snippet: "Выберите свой Любимый магазин М.Видео Письмо не отображается корректно? Перейти на сайт М",
      date: "Вчера"
    },
    {
      new: false,
      checked: false,
      faved: false,
      sender: "PayPal",
      subject: "Скидка 10% на Farfetch.com только при оплате с PayPal",
      snippet: "Привет, хотел у вас узнать по поводу разрешения на охоту. Тут такое дело",
      date: "9 Дек"
    },
    {
      new: true,
      checked: false,
      faved: false,
      sender: "HeadHunter",
      subject: "Андрей, почему вы ушли с предыдущей работы?",
      snippet: "Поиск вакансий Отклики на вакансии Мы на мобильных Продвижение резюме Статьи> 5 причин неудач в",
      date: "9 Дек"
    },
    {
      new: false,
      checked: false,
      faved: false,
      sender: "Алексей Петров",
      subject: "Разрешение на охоту",
      snippet: "Привет, хотел у вас узнать по поводу разрешения на охоту. Тут такое дело",
      date: "19:30"
    },
    {
      new: false,
      checked: false,
      faved: false,
      sender: "HeadHunter",
      subject: "Андрей, почему вы ушли с предыдущей работы?",
      snippet: "Поиск вакансий Отклики на вакансии Мы на мобильных Продвижение резюме Статьи> 5 причин неудач в",
      date: "9 Дек"
    },
    {
      new: false,
      checked: false,
      faved: false,
      sender: "Алексей Петров",
      subject: "Разрешение на охоту",
      snippet: "Привет, хотел у вас узнать по поводу разрешения на охоту. Тут такое дело",
      date: "19:30"
    },
    {
      new: false,
      checked: false,
      faved: false,
      sender: "HeadHunter",
      subject: "Андрей, почему вы ушли с предыдущей работы?",
      snippet: "Поиск вакансий Отклики на вакансии Мы на мобильных Продвижение резюме Статьи> 5 причин неудач в",
      date: "9 Дек"
    },
    {
      new: false,
      checked: false,
      faved: false,
      sender: "Алексей Петров",
      subject: "Разрешение на охоту",
      snippet: "Привет, хотел у вас узнать по поводу разрешения на охоту. Тут такое дело",
      date: "19:30"
    },
    {
      new: false,
      checked: false,
      faved: false,
      sender: "HeadHunter",
      subject: "Андрей, почему вы ушли с предыдущей работы?",
      snippet: "Поиск вакансий Отклики на вакансии Мы на мобильных Продвижение резюме Статьи> 5 причин неудач в",
      date: "9 Дек"
    },
    {
      new: false,
      checked: false,
      faved: false,
      sender: "Алексей Петров",
      subject: "Разрешение на охоту",
      snippet: "Привет, хотел у вас узнать по поводу разрешения на охоту. Тут такое дело",
      date: "19:30"
    },
    {
      new: false,
      checked: false,
      faved: false,
      sender: "HeadHunter",
      subject: "Андрей, почему вы ушли с предыдущей работы?",
      snippet: "Поиск вакансий Отклики на вакансии Мы на мобильных Продвижение резюме Статьи> 5 причин неудач в",
      date: "9 Дек"
    },
    {
      new: false,
      checked: false,
      faved: false,
      sender: "Алексей Петров",
      subject: "Разрешение на охоту",
      snippet: "Привет, хотел у вас узнать по поводу разрешения на охоту. Тут такое дело",
      date: "19:30"
    },
  ]
}

let List = React.createClass({

  render: function() {
    return (
      <div className="main-section">
        <Sidebar/>
        <div className="list">
          { React.cloneElement (
            this.props.children,
            lettersData
          )}
        </div>
      </div>
    )
  }
});

module.exports = List;
