let extendObject = require('lodash.assign')

function Caroucel(options) {
  options = extendObject(Caroucel.options, options)
  this.caroucelItems = options.caroucelItems
  this.currentClassname = "caroucel__item--current"
  this.currentIndex = 0
}

Caroucel.prototype = {
  constructor : Caroucel,

  init : function() {
    this.currentlItem = this.caroucelItems[this.currentIndex]

    let caroucelArrowLeft = document.querySelectorAll(".caroucel__arrow--left")[0],
        caroucelArrowRight = document.querySelectorAll(".caroucel__arrow--right")[0]

    caroucelArrowLeft.addEventListener("click", function() {
      if(this.currentIndex > 0) this.currentIndex -= 1

      this.caroucelItems = this.caroucelItems[this.currentIndex]
      makeItemCurrent(this.currentIndex)
    })

    caroucelArrowRight.addEventListener("click", function() {
      if(this.currentIndex < (caroucelItems.length - 1))  this.currentIndex += 1

      this.caroucelItems = this.caroucelItems[this.currentIndex]
      makeItemCurrent(this.currentIndex)
    })
  },

  updateCurrentItem: function() {
    forEach(this.caroucelItems, function(el, index){
      index !== this.currentIndex ? this.caroucelItems[index].classList.remove(this.currentClassname) : this.caroucelItems[index].classList.add(this.currentClassname)
    })
  }

}
//-----

let caroucelItems = document.querySelectorAll(".caroucel__item")

caroucel()

function caroucel() {
  this.currentIndex = 0
  currentCaroucelItem = caroucelItems[this.currentIndex]
  makeItemCurrent(this.currentIndex)

  caroucelArrowLeft = document.querySelectorAll(".caroucel__arrow--left")[0]
  caroucelArrowRight = document.querySelectorAll(".caroucel__arrow--right")[0]

  caroucelArrowLeft.addEventListener("click", function() {
    if(this.currentIndex > 0) this.currentIndex -= 1

    currentCaroucelItem = caroucelItems[this.currentIndex]
    makeItemCurrent(this.currentIndex)
  })

  caroucelArrowRight.addEventListener("click", function() {
    if(this.currentIndex < (caroucelItems.length - 1))  this.currentIndex += 1

    currentCaroucelItem = caroucelItems[this.currentIndex]
    makeItemCurrent(this.currentIndex)
  })


}

function makeItemCurrent(this.currentIndex) {
  let currentCaroucelItemClassname = "caroucel__item--current"
  forEach(caroucelItems, function(el, index){
    index !== this.currentIndex ? caroucelItems[index].classList.remove(currentCaroucelItemClassname) : caroucelItems[index].classList.add(currentCaroucelItemClassname)
  })
  return
}

Caroucel.options = {
  caroucelItems: document.querySelectorAll(".caroucel__item")
}
