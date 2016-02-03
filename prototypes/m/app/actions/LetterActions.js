let AppDispatcher = require('../dispatcher/AppDispatcher')
let LetterConstants = require('../constants/LetterConstants')

let LetterActions = {

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
  }
};

module.exports = LetterActions
