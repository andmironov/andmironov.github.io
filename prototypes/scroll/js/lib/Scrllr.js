let debouncer = require("./Debouncer")

function Scrllr(options) {
  options = extend(options, Scrllr.options)

  this.lastKnownScrollY = 0
  this.initialised = false
  this.onScrollCallback = options.onScrollCallback
}

Scrllr.prototype = {
  constructor : Scrllr,

  init : function() {
    this.debouncer = new debouncer(this.update.bind(this))

    // defer event registration to handle browser
    // potentially restoring previous scroll position
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

Scrllr.options = {
  onScrollCallback: function(){}
}

/**
 * Helper function for extending objects
 */
function extend (object /*, objectN ... */) {
  if(arguments.length <= 0) {
    throw new Error('Missing arguments in extend function');
  }

  var result = object || {},
      key,
      i;

  for (i = 1; i < arguments.length; i++) {
    var replacement = arguments[i] || {};

    for (key in replacement) {
      // Recurse into object except if the object is a DOM element
      if(typeof result[key] === 'object' && ! isDOMElement(result[key])) {
        result[key] = extend(result[key], replacement[key]);
      }
      else {
        result[key] = result[key] || replacement[key];
      }
    }
  }

  return result;
}

module.exports = Scrllr
