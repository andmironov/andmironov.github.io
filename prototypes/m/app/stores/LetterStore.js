import AppDispatcher from '../dispatcher/AppDispatcher'
import { EventEmitter } from 'events'
import LetterConstants from '../constants/LetterConstants'
import assign from 'object-assign'

const CHANGE_EVENT = 'change'

let _letters = {
  letters: [
    {
      id: 0,
      new: true,
      checked: false,
      faved: false,
      folder: "inbox",
      sender: "Алексей Петров",
      subject: "Разрешение на охоту",
      snippet: "Привет, хотел у вас узнать по поводу разрешения на охоту. Тут такое дело",
      date: "19:30"
    },
    {
      id: 1,
      new: false,
      checked: false,
      faved: false,
      folder: "inbox",
      sender: "Slack notifications",
      subject: "Notifications 23-30 Dec",
      snippet: "Привет, хотел у вас узнать по поводу разрешения на охоту. Тут такое дело",
      date: "11:49"
    },
    {
      id: 2,
      new: true,
      checked: false,
      faved: false,
      folder: "inbox",
      sender: "React Newsletter",
      subject: "React Newsletter - Issue 21",
      snippet: "Your weekly newsletter of the best React.js news, articles, projects and more. View on the web",
      date: "Вчера"
    },
    {
      id: 3,
      new: true,
      checked: false,
      faved: false,
      folder: "inbox",
      sender: "MyFonts News",
      subject: "Creative Characters highlights from the last 99 issues",
      snippet: "MyFonts logo MyFonts: Creative Characters Highlights from the last 99 issues, January 2016 Read in a",
      date: "Вчера"
    },
    {
      id: 4,
      new: true,
      checked: false,
      faved: false,
      folder: "inbox",
      sender: "М.Видео",
      subject: "Андрей, получите скидку 500 рублей и доступ к уникальным предложениям!",
      snippet: "Выберите свой Любимый магазин М.Видео Письмо не отображается корректно? Перейти на сайт М",
      date: "Вчера"
    },
    {
      id: 5,
      new: false,
      checked: false,
      faved: false,
      folder: "inbox",
      sender: "PayPal",
      subject: "Скидка 10% на Farfetch.com только при оплате с PayPal",
      snippet: "Привет, хотел у вас узнать по поводу разрешения на охоту. Тут такое дело",
      date: "9 Дек"
    },
    {
      id: 6,
      new: false,
      checked: false,
      faved: false,
      folder: "inbox",
      sender: "HeadHunter",
      subject: "Андрей, почему вы ушли с предыдущей работы?",
      snippet: "Поиск вакансий Отклики на вакансии Мы на мобильных Продвижение резюме Статьи> 5 причин неудач в",
      date: "9 Дек"
    },
    {
      id: 7,
      new: false,
      checked: false,
      faved: false,
      folder: "inbox",
      sender: "Алексей Петров",
      subject: "Разрешение на охоту",
      snippet: "Привет, хотел у вас узнать по поводу разрешения на охоту. Тут такое дело",
      date: "19:30"
    },
    {
      id: 8,
      new: false,
      checked: false,
      faved: false,
      folder: "inbox",
      sender: "Алексей Петров",
      subject: "Разрешение на охоту",
      snippet: "Привет, хотел у вас узнать по поводу разрешения на охоту. Тут такое дело",
      date: "19:30"
    },
    {
      id: 9,
      new: false,
      checked: false,
      faved: false,
      folder: "inbox",
      sender: "Slack notifications",
      subject: "Notifications 23-30 Dec",
      snippet: "Привет, хотел у вас узнать по поводу разрешения на охоту. Тут такое дело",
      date: "11:49"
    },
    {
      id: 10,
      new: false,
      checked: false,
      faved: false,
      folder: "sent",
      sender: "React Newsletter",
      subject: "React Newsletter - Issue 21",
      snippet: "Your weekly newsletter of the best React.js news, articles, projects and more. View on the web",
      date: "Вчера"
    },
    {
      id: 11,
      new: false,
      checked: false,
      faved: false,
      folder: "inbox",
      sender: "MyFonts News",
      subject: "Creative Characters highlights from the last 99 issues",
      snippet: "MyFonts logo MyFonts: Creative Characters Highlights from the last 99 issues, January 2016 Read in a",
      date: "Вчера"
    },
    {
      id: 12,
      new: false,
      checked: false,
      faved: false,
      folder: "inbox",
      sender: "М.Видео",
      subject: "Андрей, получите скидку 500 рублей и доступ к уникальным предложениям!",
      snippet: "Выберите свой Любимый магазин М.Видео Письмо не отображается корректно? Перейти на сайт М",
      date: "Вчера"
    },
    {
      id: 13,
      new: false,
      checked: false,
      faved: false,
      folder: "inbox",
      sender: "PayPal",
      subject: "Скидка 10% на Farfetch.com только при оплате с PayPal",
      snippet: "Привет, хотел у вас узнать по поводу разрешения на охоту. Тут такое дело",
      date: "9 Дек"
    },
    {
      id: 14,
      new: false,
      checked: false,
      faved: false,
      folder: "inbox",
      sender: "HeadHunter",
      subject: "Андрей, почему вы ушли с предыдущей работы?",
      snippet: "Поиск вакансий Отклики на вакансии Мы на мобильных Продвижение резюме Статьи> 5 причин неудач в",
      date: "9 Дек"
    },
    {
      id: 15,
      new: false,
      checked: false,
      faved: false,
      folder: "inbox",
      sender: "Алексей Петров",
      subject: "Разрешение на охоту",
      snippet: "Привет, хотел у вас узнать по поводу разрешения на охоту. Тут такое дело",
      date: "19:30"
    },
    {
      id: 16,
      new: false,
      checked: false,
      faved: false,
      folder: "inbox",
      sender: "HeadHunter",
      subject: "Андрей, почему вы ушли с предыдущей работы?",
      snippet: "Поиск вакансий Отклики на вакансии Мы на мобильных Продвижение резюме Статьи> 5 причин неудач в",
      date: "9 Дек"
    },
    {
      id: 17,
      new: false,
      checked: false,
      faved: false,
      folder: "inbox",
      sender: "Алексей Петров",
      subject: "Разрешение на охоту",
      snippet: "Привет, хотел у вас узнать по поводу разрешения на охоту. Тут такое дело",
      date: "19:30"
    },
    {
      id: 18,
      new: false,
      checked: false,
      faved: false,
      folder: "inbox",
      sender: "HeadHunter",
      subject: "Андрей, почему вы ушли с предыдущей работы?",
      snippet: "Поиск вакансий Отклики на вакансии Мы на мобильных Продвижение резюме Статьи> 5 причин неудач в",
      date: "9 Дек"
    },
    {
      id: 19,
      new: false,
      checked: false,
      faved: false,
      folder: "inbox",
      sender: "Алексей Петров",
      subject: "Разрешение на охоту",
      snippet: "Привет, хотел у вас узнать по поводу разрешения на охоту. Тут такое дело",
      date: "19:30"
    },
    {
      id: 20,
      new: false,
      checked: false,
      faved: false,
      folder: "inbox",
      sender: "HeadHunter",
      subject: "Андрей, почему вы ушли с предыдущей работы?",
      snippet: "Поиск вакансий Отклики на вакансии Мы на мобильных Продвижение резюме Статьи> 5 причин неудач в",
      date: "9 Дек"
    },
    {
      id: 21,
      new: false,
      checked: false,
      faved: false,
      folder: "inbox",
      sender: "Алексей Петров",
      subject: "Разрешение на охоту",
      snippet: "Привет, хотел у вас узнать по поводу разрешения на охоту. Тут такое дело",
      date: "19:30"
    },
    {
      id: 22,
      new: false,
      checked: false,
      faved: false,
      folder: "inbox",
      sender: "HeadHunter",
      subject: "Андрей, почему вы ушли с предыдущей работы?",
      snippet: "Поиск вакансий Отклики на вакансии Мы на мобильных Продвижение резюме Статьи> 5 причин неудач в",
      date: "9 Дек"
    },
    {
      id: 23,
      new: false,
      checked: false,
      faved: false,
      folder: "inbox",
      sender: "Алексей Петров",
      subject: "Разрешение на охоту",
      snippet: "Привет, хотел у вас узнать по поводу разрешения на охоту. Тут такое дело",
      date: "19:30"
    },
  ]
}

function update(id, updates) {
  _letters.letters[id] = assign({}, _letters.letters[id], updates);
}

function updateAll(updates) {
  for (let id in _letters.letters) {
    update(id, updates);
  }
}

let letterStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return _letters;
  },

  areAllChecked: function() {
    for (var id in _letters.letters) {
      if (!_letters.letters[id].checked) {
        return false;
      }
    }
    return true;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
})

AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case LetterConstants.LETTER_CHECK:
      update(action.id, {checked: true});
      letterStore.emitChange();
      break;

    case LetterConstants.LETTER_UNCHECK:
      update(action.id, {checked: false});
      letterStore.emitChange();
      break;

    case LetterConstants.LETTER_TOGGLE_CHECK_ALL:
      if (letterStore.areAllChecked()) {
        updateAll({checked: false});
      } else {
        updateAll({checked: true});
      }
      letterStore.emitChange();
      break;

    case LetterConstants.LETTER_FAV:
      update(action.id, {faved: true});
      letterStore.emitChange();
      break;

    case LetterConstants.LETTER_UNFAV:
      update(action.id, {faved: false});
      letterStore.emitChange();
      break;
  }
})

module.exports = letterStore;