import AppDispatcher from '../dispatcher/AppDispatcher'
import LetterConstants from '../constants/LetterConstants'

let LetterActions = {

  checkFiltered: function(filter) {
    AppDispatcher.dispatch({
      actionType: LetterConstants.CHECK_FILTERED,
      filter: filter
    })
  },

  unCheckFiltered: function(filter) {
    AppDispatcher.dispatch({
      actionType: LetterConstants.UNCHECK_FILTERED,
      filter: filter
    })
  },

  toggleCheckFiltered: function(filter) {
    AppDispatcher.dispatch({
      actionType: LetterConstants.TOGGLE_CHECK_FILTERED,
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

  checkFavedFiltered: function(filter) {
    AppDispatcher.dispatch({
      actionType: LetterConstants.CHECK_FAVED_FILTERED,
      filter: filter
    })
  },

  checkUnFavedFiltered: function(filter) {
    AppDispatcher.dispatch({
      actionType: LetterConstants.CHECK_UNFAVED_FILTERED,
      filter: filter
    })
  },

  checkNewFiltered: function(filter) {
    AppDispatcher.dispatch({
      actionType: LetterConstants.CHECK_NEW_FILTERED,
      filter: filter
    })
  },

  checkNotNewFiltered: function(filter) {
    AppDispatcher.dispatch({
      actionType: LetterConstants.CHECK_NOT_NEW_FILTERED,
      filter: filter
    })
  },
};

module.exports = LetterActions
