(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
      }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }return n[o].exports;
  }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) s(r[o]);return s;
})({ 1: [function (require, module, exports) {
    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

    /**
     * Handles debouncing of events via requestAnimationFrame
     * @see http://www.html5rocks.com/en/tutorials/speed/animations/
     * @param {Function} callback The callback to handle whichever event
     */
    function Debouncer(callback) {
      this.callback = callback;
      this.ticking = false;
    }
    Debouncer.prototype = {
      constructor: Debouncer,

      /**
       * dispatches the event to the supplied callback
       * @private
       */
      update: function () {
        this.callback && this.callback();
        this.ticking = false;
      },

      /**
       * ensures events don't get stacked
       * @private
       */
      requestTick: function () {
        if (!this.ticking) {
          requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this)));
          this.ticking = true;
        }
      },

      /**
       * Attach this as the event listeners
       */
      handleEvent: function () {
        this.requestTick();
      }
    };

    module.exports = Debouncer;
  }, {}], 2: [function (require, module, exports) {
    let debouncer = require("./Debouncer");

    function Scrllr(options) {
      options.assign(Scrllr.options);

      this.lastKnownScrollY = 0;
      this.initialised = false;
      this.onScrollCallback = options.onScrollCallback;
    }

    Scrllr.prototype = {
      constructor: Scrllr,

      init: function () {
        this.debouncer = new debouncer(this.update.bind(this));

        // defer event registration to handle browser
        // potentially restoring previous scroll position
        setTimeout(this.attachEvent.bind(this), 100);

        return this;
      },

      attachEvent: function () {
        if (!this.initialised) {
          this.lastKnownScrollY = this.getScrollY();
          this.initialised = true;

          window.addEventListener('scroll', this.debouncer, false);
          this.debouncer.handleEvent();
        }
      },

      getScrollY: function () {
        return window.pageYOffset !== undefined ? window.pageYOffset : window.scrollTop !== undefined ? window.scrollTop : (document.documentElement || document.body.parentNode || document.body).scrollTop;
      },

      update: function () {
        let currentScrollY = this.getScrollY(),
            scrollDirection = currentScrollY > this.lastKnownScrollY ? 'down' : 'up';

        this.onScrollCallback(currentScrollY);
        this.lastKnownScrollY = currentScrollY;
      },

      destroy: function () {
        this.initialised = false;
        window.removeEventListener('scroll', this.debouncer, false);
      }

    };

    Scrllr.options = {
      onScrollCallback: function () {}
    };

    module.exports = Scrllr;
  }, { "./Debouncer": 1 }], 3: [function (require, module, exports) {
    let Scrllr = require("./lib/Scrllr.js");

    let scrllr = new Scrllr();
  }, { "./lib/Scrllr.js": 2 }] }, {}, [3]);
//# sourceMappingURL=app.js.map
