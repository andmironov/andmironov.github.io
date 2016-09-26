let forEach = require('lodash.forEach'),
    extendObject = require('lodash.assign')

function Caroucel(options) {
  options = extendObject(Caroucel.options, options)

  this.items = options.items
  this.wrap = options.wrap
  this.currentClassname = "caroucel__item--current"
  this.currentIndex = 0
  this.arrowLeft = document.querySelectorAll(".caroucel__arrow--left")[0],
  this.arrowRight = document.querySelectorAll(".caroucel__arrow--right")[0]
}

Caroucel.prototype = {
  constructor : Caroucel,

  init: function() {

    this.update(this.currentIndex)
    this.arrowLeft.addEventListener("click", this.moveLeft.bind(this))
    this.arrowRight.addEventListener("click", this.moveRight.bind(this))
  },

  update: function(newIndex, direction) {
    let oldIndex = this.currentIndex

    this.updateItems(newIndex, direction, oldIndex)
    this.updateNav(newIndex, direction, oldIndex)
    this.updateWrap(newIndex)

    this.currentIndex = newIndex

    return
  },

  updateItems: function(newIndex, direction, oldIndex) {
    let classname = this.currentClassname
    this.addTemporaryClassName(oldIndex, direction)

    forEach(this.items, function(el, i) {
      i !== newIndex ? el.classList.remove(classname) : el.classList.add(classname)
    })
  },

  updateNav: function(newIndex) {
    switch (newIndex) {
      case this.items.length - 1:
        this.disableArrow("right")
        this.enableArrow("left")
        break;

      case 0:
        this.disableArrow("left")
        this.enableArrow("right")
        break;

      default:
        this.enableArrow("all")
    }
  },

  moveLeft: function() {
    if(this.currentIndex > 0) {
      let newIndex = this.currentIndex - 1
      this.update(newIndex, "left")
    }
    return
  },

  moveRight: function() {
    if(this.currentIndex < (this.items.length - 1)) {
      let newIndex = this.currentIndex + 1
      this.update(newIndex, "right")
    }
    return
  },

  disableArrow: function(arrow) {
    switch (arrow) {
      case "left":
        this.arrowLeft.classList.add("disabled")
        break;

      case "right":
        this.arrowRight.classList.add("disabled")
        break;

      case "all":
        this.arrowLeft.classList.add("disabled")
        this.arrowRight.classList.add("disabled")
        break;
    }
  },

  enableArrow: function(arrow) {
    switch (arrow) {
      case "left":
        this.arrowLeft.classList.remove("disabled")
        break;

      case "right":
        this.arrowRight.classList.remove("disabled")
        break;

      case "all":
        this.arrowLeft.classList.remove("disabled")
        this.arrowRight.classList.remove("disabled")
        break;
    }
  },

  addTemporaryClassName: function(index, direction) {
    let item = this.items[index]

    switch (direction) {
      case "right":
        item.classList.add("moving-left")
        setTimeout(function(){
          item.classList.remove("moving-left")
        }, 500)
        break;

      case "left":
        item.classList.add("moving-right")
        setTimeout(function(){
          item.classList.remove("moving-right")
        }, 500)
        break;
    }
  },

  inverseDirection: function(direction) {
    let inversedDirection
    switch (direction) {
      case "right":
        inversedDirection = "left"
        break;

      case "left":
        inversedDirection = "right"
        break;
    }
    return inversedDirection
  },

  updateWrap: function(newIndex) {
    newIndex == 0 ? this.wrap.classList.add("slide--blue") : this.wrap.classList.remove("slide--blue")
  }
}

Caroucel.options = {
  items: document.querySelectorAll(".caroucel__item"),
  wrap: document.querySelectorAll(".slide--four")[0]
}

module.exports = Caroucel
