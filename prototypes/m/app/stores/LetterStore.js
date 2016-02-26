import AppDispatcher from '../dispatcher/AppDispatcher'
import { EventEmitter } from 'events'
import LetterConstants from '../constants/LetterConstants'
import assign from 'object-assign'
import _ from 'lodash'

const CHANGE_EVENT = 'change'

function updateOne(id, updates) {
  _letters.letters[id] = assign({}, _letters.letters[id], updates)
}

function updateFiltered(updates, filter) {
  _letters.letters.filter(filter).map(item => updateOne(item.id, updates))
}

function updateSomeFiltered(updates, filter, some) {
  let filtered = _letters.letters.filter(filter).filter(some)
  filtered.map(item => updateOne(item.id, updates))
}

let letterStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return _letters
  },

  getFiltered: function(cb) {
    return _letters.letters.filter(cb(letter))
  },

  areSomeFilteredChecked: function(filter) {
    let filtered = _letters.letters.filter(filter)
    return filtered.some(item => item.checked)
  },

  countNewInFolder: function(folderName) {
    let count

    let folder = _letters.letters.filter(function(item) {
      return item.folder == folderName
    })
    let newInFolder = folder.filter(function(item) {
      if (folderName == "drafts") return true
      return item.new == true
    })
    count = newInFolder.length

    return count
  },

  countNewInFolders: function() {
    let count = {}

    let allFolders = _.flatMap(_letters.letters, (item) => {
      return item.folder
    })

    let uniqFolders = _.uniq(allFolders);

    uniqFolders.forEach((key, value) => {
      //REVIEW: dont count sent
      if (key == "sent") return
      count[key] = this.countNewInFolder(key)
    })

    return count
  },

  countCheckedInFolder: function(folderName) {
    let count

    let folder = _letters.letters.filter(function(item) {
      return item.folder == folderName
    })
    let checkedInFolder = folder.filter(function(item) {
      return item.checked == true
    })
    count = checkedInFolder.length
    return count
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT)
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }
})

AppDispatcher.register(function(action) {

  switch(action.actionType) {

    case LetterConstants.LETTER_CHECK:
      updateOne(action.id, {checked: true})
      letterStore.emitChange()
      break

    case LetterConstants.LETTER_UNCHECK:
      updateOne(action.id, {checked: false})
      letterStore.emitChange()
      break

    case LetterConstants.LETTER_FAV:
      updateOne(action.id, {faved: true})
      letterStore.emitChange()
      break

    case LetterConstants.LETTER_UNFAV:
      updateOne(action.id, {faved: false})
      letterStore.emitChange()
      break

    case LetterConstants.CHECK_FILTERED:
      updateFiltered({checked: true}, action.filter)
      letterStore.emitChange()
      break

    case LetterConstants.UNCHECK_FILTERED:
      updateFiltered({checked: false}, action.filter)
      letterStore.emitChange()
      break

    case LetterConstants.TOGGLE_CHECK_FILTERED:
      if (letterStore.areSomeFilteredChecked(action.filter)) {
        updateFiltered({checked: false}, action.filter)
      } else {
        updateFiltered({checked: true}, action.filter)
      }
      letterStore.emitChange()
      break

    case LetterConstants.CHECK_FAVED_FILTERED:
      if (letterStore.areSomeFilteredChecked(action.filter)) {
        updateFiltered({checked: false}, action.filter)
      }
      updateSomeFiltered({checked: true}, action.filter, (item) => {
        return item.faved
      })
      letterStore.emitChange()
      break

    case LetterConstants.CHECK_UNFAVED_FILTERED:
      if (letterStore.areSomeFilteredChecked(action.filter)) {
        updateFiltered({checked: false}, action.filter)
      }
      updateSomeFiltered({checked: true}, action.filter, (item) => {
        return !item.faved
      })
      letterStore.emitChange()
      break

    case LetterConstants.CHECK_NEW_FILTERED:
      if (letterStore.areSomeFilteredChecked(action.filter)) {
        updateFiltered({checked: false}, action.filter)
      }
      updateSomeFiltered({checked: true}, action.filter, (item) => {
        return item.new
      })
      letterStore.emitChange()
      break

    case LetterConstants.CHECK_NOT_NEW_FILTERED:
      if (letterStore.areSomeFilteredChecked(action.filter)) {
        updateFiltered({checked: false}, action.filter)
      }
      updateSomeFiltered({checked: true}, action.filter, (item) => {
        return !item.new
      })
      letterStore.emitChange()
      break
  }
})

let _folders = ["inbox", "sent", "faved", "drafts", "bin", "spam"]

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
      folder: "drafts",
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
      folder: "sent",
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
      folder: "sent",
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


module.exports = letterStore
