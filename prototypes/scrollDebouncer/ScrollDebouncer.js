let extendObject = require('lodash.assign'),
    debouncer = require("./Debouncer")

function ScrollDebouncer(options) {
  options = extendObject(ScrollDebouncer.options, options)
  this.lastKnownScrollY = 0
  this.initialised = false
  this.onScrollCallback = options.onScrollCallback
}

ScrollDebouncer.prototype = {
  constructor : ScrollDebouncer,

  init : function() {
    this.debouncer = new debouncer(this.update.bind(this))
    setTimeout(this.attachEvent.bind(this), 100)
    return this
  },

  attachEvent : function() {
    if(!this.initialised) {
      this.lastKnownScrollY = this.getScrollY()
      this.initialised = true
      window.addEventListener('scroll', this.debouncer, false)
      this.debouncer.handleEvent()
    }
  },

  getScrollY : function() {
    return (window.pageYOffset !== undefined)
      ? window.pageYOffset
      : (window.scrollTop !== undefined)
          ? window.scrollTop
          : (document.documentElement || document.body.parentNode || document.body).scrollTop
  },

  update : function() {
    let currentScrollY  = this.getScrollY(),
        scrollDirection = currentScrollY > this.lastKnownScrollY ? 'down' : 'up'
    this.onScrollCallback(currentScrollY)
    this.lastKnownScrollY = currentScrollY
  },

  destroy : function() {
    this.initialised = false
    window.removeEventListener('scroll', this.debouncer, false)
  }
}

ScrollDebouncer.options = {
  onScrollCallback: function(){}
}

module.exports = ScrollDebouncer
