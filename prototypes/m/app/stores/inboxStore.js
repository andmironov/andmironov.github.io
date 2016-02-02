import Dispatcher from '../Dispatcher'
import Constants from '../constants/Constants'

let EventEmitter = require('events').EventEmitter;
let AppDispatcher = new Dispatcher();
let assign = require('object-assign');

const CHANGE_EVENT = 'change';

//private items object
let _items = {};

function selectLetter(item) {
  let id = Date.now();
  _items[id] = {
    id: id,
    complete: false,
    text: text
  }
}

function deleteItem(id) {
  delete _items[id];
}

let ItemsStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return _items;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    let action = payload.action;
    let text;

    switch(action.actionType) {

      case Constants.LETTER_SELECT:
        text = action.text.trim();

        if (text !== '') {
          selectLetter(text);
          ItemsStore.emitChange();
        }
        break;
    }

    return true;
  })

})

module.exports = ItemsStore;
