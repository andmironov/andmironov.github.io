let Scrllr = require("./lib/Scrllr.js"),
    Caroucel = require('./caroucel.js'),
    animateScroll = require('./animatescroll.js'),
    forEach = require('lodash.foreach'),
    animatedScrollTo = require('animated-scrollto')


let scrllr = new Scrllr({ onScrollCallback: cb })
scrllr.init()

let caroucel = new Caroucel()
caroucel.init()

document.querySelectorAll(".button--description")[0].addEventListener('click', function (e) {
  document.querySelectorAll(".slide--two .p--hidden")[0].classList.remove("p--hidden")
  e.preventDefault()
})

document.querySelectorAll(".button--prediction")[0].addEventListener('click', function (e) {
  document.querySelectorAll(".slide--three .p--hidden")[0].classList.remove("p--hidden")
  e.preventDefault()
})















//Slides

let slides = document.querySelectorAll(".slide")


function getElementProperties(el, scrlly) {
  let rect = el.getBoundingClientRect()
    return {
      offsetTop: rect.top,
      height: rect.height,
      scrollY: rect.top + scrlly
    }
}

function getViewportHeight() {
  return Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
}

let viewportHeight = getViewportHeight()

let elements = new Array()

function cb(currentScrollY) {

  forEach(slides, function(el, i) {
    elements[i] = getElementProperties(el, currentScrollY)
    if(elements[i].offsetTop < (elements[i].height/2) && elements[i].offsetTop > (-Math.abs(elements[i].height/2)) ) showSlide(i)
  })
}


function showSlide(index) {
  let classname = "slide--active"
  slides[index].classList.add(classname)
}

document.querySelectorAll(".button--scroller")[0].addEventListener('click', function () {
    animateScroll(elements[1].scrollY, 600, "easeInOutCubic", -10)
})
