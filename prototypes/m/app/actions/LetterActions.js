import AppDispatcher from '../dispatcher/AppDispatcher'
import LetterConstants from '../constants/LetterConstants'

let LetterActions = {

  checkAllFiltered: function(filter) {
    AppDispatcher.dispatch({
      actionType: LetterConstants.MESSAGES_CHECK_ALL,
      filter: filter
    })
  },

  toggleChecked: function(letter) {
    let id = letter.id;
    let actionType = letter.checked ? LetterConstants.LETTER_UNCHECK : LetterConstants.LETTER_CHECK;

    AppDispatcher.dispatch({
      actionType: actionType,
      id: id
    })
  },

  toggleFaved: function(letter) {
    let id = letter.id;
    let actionType = letter.faved ? LetterConstants.LETTER_UNFAV : LetterConstants.LETTER_FAV;

    AppDispatcher.dispatch({
      actionType: actionType,
      id: id
    })
  },

  toggleCheckAll: function() {
    AppDispatcher.dispatch({
      actionType: LetterConstants.LETTER_TOGGLE_CHECK_ALL
    })
  },

  toggleCheckAllInFolder: function(folderName) {
    AppDispatcher.dispatch({
      actionType: LetterConstants.LETTER_TOGGLE_CHECK_ALL_IN_FOLDER,
      folderName: folderName
    })
  },

  сheckNoneInFolder: function(folderName) {
    AppDispatcher.dispatch({
      actionType: LetterConstants.LETTER_CHECK_NONE_IN_FOLDER,
      folderName: folderName
    })
  },

  checkFavedInFolder: function(folderName) {
    AppDispatcher.dispatch({
      actionType: LetterConstants.LETTER_CHECK_FAVED_IN_FOLDER,
      folderName: folderName
    })
  },

  checkUnFavedInFolder: function(folderName) {
    AppDispatcher.dispatch({
      actionType: LetterConstants.LETTER_CHECK_UNFAVED_IN_FOLDER,
      folderName: folderName
    })
  },

  checkNewInFolder: function(folderName) {
    AppDispatcher.dispatch({
      actionType: LetterConstants.LETTER_CHECK_NEW_IN_FOLDER,
      folderName: folderName
    })
  },

  checkNotNewInFolder: function(folderName) {
    AppDispatcher.dispatch({
      actionType: LetterConstants.LETTER_CHECK_NOT_NEW_IN_FOLDER,
      folderName: folderName
    })
  },
};

module.exports = LetterActions
