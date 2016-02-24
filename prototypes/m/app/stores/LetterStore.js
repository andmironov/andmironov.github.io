import AppDispatcher from '../dispatcher/AppDispatcher'
import { EventEmitter } from 'events'
import LetterConstants from '../constants/LetterConstants'
import assign from 'object-assign'
import _ from 'lodash'

const CHANGE_EVENT = 'change'

function update(id, updates) {
  _letters.letters[id] = assign({}, _letters.letters[id], updates)
}

function updateAllInFolder(updates, folderName) {
  _letters.letters.map(item => {
    if(item.folder == folderName) update(item.id, updates)
  })
}

function updateFiltered(updates, filter) {
  _letters.letters.filter(filter).map(item => update(item.id, updates))
}

function checkFavedInFolder(folderName) {
  _letters.letters.map(item => {
    if(item.folder == folderName && item.faved) update(item.id, {checked: true})
  })
}

function checkUnFavedInFolder(folderName) {
  _letters.letters.map(item => {
    if(item.folder == folderName && !item.faved) update(item.id, {checked: true})
  })
}

function checkNewInFolder(folderName) {
  _letters.letters.map(item => {
    if(item.folder == folderName && item.new) update(item.id, {checked: true})
  })
}

function checkNotNewInFolder(folderName) {
  _letters.letters.map(item => {
    if(item.folder == folderName && !item.new) update(item.id, {checked: true})
  })
}

let letterStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return _letters
  },

  getFiltered: function(cb) {
    return _letters.letters.filter(cb(letter))
  },

  areAllInFolderChecked: function(folderName) {
    let folder = _letters.letters.filter(function(item) {
      return item.folder == folderName
    })
    return folder.every(item => item.checked)
  },

  areSomeInFolderChecked: function(folderName) {
    let folder = _letters.letters.filter(function(item) {
      return item.folder == folderName
    })
    return folder.some(item => item.checked)
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
      update(action.id, {checked: true})
      letterStore.emitChange()
      break

    case LetterConstants.LETTER_UNCHECK:
      update(action.id, {checked: false})
      letterStore.emitChange()
      break

    case LetterConstants.LETTER_TOGGLE_CHECK_ALL:
      if (letterStore.areAllChecked()) {
        updateAll({checked: false})
      } else {
        updateAll({checked: true})
      }
      letterStore.emitChange()
      break

    case LetterConstants.MESSAGES_CHECK_ALL:
      updateFiltered({checked: true}, action.filter)
      letterStore.emitChange()
      break

    case LetterConstants.LETTER_CHECK_NONE_IN_FOLDER:
      updateAllInFolder({checked: false}, action.folderName)
      letterStore.emitChange()
      break

    case LetterConstants.LETTER_TOGGLE_CHECK_ALL_IN_FOLDER:
      if (letterStore.areSomeInFolderChecked(action.folderName)) {
        updateAllInFolder({checked: false}, action.folderName)
      } else {
        updateAllInFolder({checked: true}, action.folderName)
      }
      letterStore.emitChange()
      break

    case LetterConstants.LETTER_CHECK_FAVED_IN_FOLDER:
      if (letterStore.areSomeInFolderChecked(action.folderName)) {
        updateAllInFolder({checked: false}, action.folderName)
      }
      checkFavedInFolder(action.folderName)
      letterStore.emitChange()
      break

    case LetterConstants.LETTER_CHECK_UNFAVED_IN_FOLDER:
      if (letterStore.areSomeInFolderChecked(action.folderName)) {
        updateAllInFolder({checked: false}, action.folderName)
      }
      checkUnFavedInFolder(action.folderName)
      letterStore.emitChange()
      break

    case LetterConstants.LETTER_CHECK_NEW_IN_FOLDER:
      if (letterStore.areSomeInFolderChecked(action.folderName)) {
        updateAllInFolder({checked: false}, action.folderName)
      }
      checkNewInFolder(action.folderName)
      letterStore.emitChange()
      break

    case LetterConstants.LETTER_CHECK_NOT_NEW_IN_FOLDER:
      if (letterStore.areSomeInFolderChecked(action.folderName)) {
        updateAllInFolder({checked: false}, action.folderName)
      }
      checkNotNewInFolder(action.folderName)
      letterStore.emitChange()
      break

    case LetterConstants.LETTER_FAV:
      update(action.id, {faved: true})
      letterStore.emitChange()
      break

    case LetterConstants.LETTER_UNFAV:
      update(action.id, {faved: false})
      letterStore.emitChange()
      break
  }
})

let starred = new Set();

let folders = {
  inbox: new Set(),
  sent: new Set(),
  spam: new Set(),
  drafts: new Set()
}

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
