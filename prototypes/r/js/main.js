let Caroucel = require('./caroucel.js'),
    forEach = require('lodash.foreach')

//Oh dear god
document.querySelectorAll(".button--description")[0].addEventListener('click', function (e) {
  document.querySelectorAll(".slide--two .p--hidden")[0].classList.remove("p--hidden")
  document.querySelectorAll(".button--description")[0].classList.add("button--hidden")
  e.preventDefault()
})

document.querySelectorAll(".button--prediction")[0].addEventListener('click', function (e) {
  document.querySelectorAll(".slide--three .p--hidden")[0].classList.remove("p--hidden")
  document.querySelectorAll(".button--prediction")[0].classList.add("button--hidden")
  e.preventDefault()
})

document.querySelectorAll(".button--astronomy")[0].addEventListener('click', function (e) {
  document.querySelectorAll(".slide--five .p--hidden")[0].classList.remove("p--hidden")
  document.querySelectorAll(".button--astronomy")[0].classList.add("button--hidden")
  e.preventDefault()
})

//Caroucel
let caroucel = new Caroucel()
caroucel.init()

//Slides
let Scrllr = require("./lib/Scrllr.js"),
    animateScroll = require('./animatescroll.js'),
    slides = document.querySelectorAll(".slide"),
    nav = document.querySelectorAll(".header .nav a"),
    viewportHeight = getViewportHeight(),
    elements = new Array()

let scrllr = new Scrllr({ onScrollCallback: cb })
scrllr.init()

function getElementProperties(el, scrollY) {
  let rect = el.getBoundingClientRect()
    return {
      offsetTop: rect.top,
      height: rect.height,
      scrollY: rect.top + scrollY
    }
}

function getViewportHeight() {
  return Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
}

function cb(currentScrollY) {
  forEach(slides, function(el, i) {
    elements[i] = getElementProperties(el, currentScrollY)
    if(elements[i].offsetTop < (elements[i].height/2) && elements[i].offsetTop > (-Math.abs(elements[i].height/2)) ) update(i, currentScrollY)
  })

}

function initNav() {
  forEach(nav, function(el, i) {
    targetElement = slides[i+1]
    nav[i].addEventListener("click", createHandler(targetElement) )
  })
}

function createHandler(targetElement) {
  return function() {
    animateScroll(targetElement, 600, "easeInOutCubic", 0)
    event.preventDefault()
  }
}

document.querySelectorAll(".button--scroller")[0].addEventListener('click', createHandler(slides[1]))
document.querySelectorAll(".slide__scroller")[0].addEventListener('click', createHandler(slides[1]))

function update(index, scrollY) {
  showSlide(index)
  initNav()
  updateNav(index)
  updateHeader(index, scrollY)
}

function showSlide(index) {
  updateNav(index)
  let classname = "slide--active"
  slides[index].classList.add(classname)
}

function updateNav(index) {
  index--
  let classname = "nav__item--active"
  forEach(nav, function(el, i) {
    i !== index ? el.classList.remove(classname) : el.classList.add(classname)
  })
}

function updateHeader(index, scrollY) {
  console.log(scrollY);
  let el = document.querySelectorAll(".header")[0],
      classname = "header--scrolled"

  scrollY > 300 ? el.classList.add(classname) : el.classList.remove(classname)
}
