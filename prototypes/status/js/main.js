let ScrollOver = require("./lib/ScrollOver.js")
let animateScroll = require("./lib/animateScroll.js")

let body = document.querySelectorAll("body")[0]
let tagline = document.querySelectorAll(".tagline")[0]

let iphone = document.querySelectorAll(".phone-wrap--iphone")[0],
    android = document.querySelectorAll(".phone-wrap--android")[0],
    features = document.querySelectorAll(".features-wrap")[0],
    slideTwo = document.querySelectorAll(".slide--two")[0],
    slideThree = document.querySelectorAll(".slide--three")[0]

setTimeout(() => body.classList.add("shown"), 400)


document.querySelectorAll(".more-button")[0].addEventListener('click', function(event){
    animateScroll(slideTwo, 600, "easeInOutCubic", 0)
    event.preventDefault()
})

document.querySelectorAll(".nav__item--features")[0].addEventListener('click', function(event){
    animateScroll(slideTwo, 600, "easeInOutCubic", 0)
    event.preventDefault()
})

document.querySelectorAll(".nav__item--about")[0].addEventListener('click', function(event){
    animateScroll(slideThree, 600, "easeInOutCubic", 0)
    event.preventDefault()
})

document.querySelectorAll(".button--scroll-top")[0].addEventListener('click', function(event){
    animateScroll(body, 1000, "easeInOutCubic", 0)
    event.preventDefault()
})


new ScrollOver({
  keyframes : [
    {
      element : iphone,
      domain : [0, 800],
      animate: [
        {
          property : "translateY",
          range : [0, 60]
        }
      ]
    },
    {
      element : android,
      domain : [0, 800],
      animate: [
        {
          property : "translateY",
          range : [0, 110]
        }
      ]
    },
    {
      element : features,
      domain : [200, 800],
      animate: [
        {
          property : "translateY",
          range : [0, -40]
        }
      ]
    },
    {
      element : slideTwo,
      reveal:
        {
          when : 700,
          className: "slide--shown"
        }

    },
    {
      element : slideThree,
      reveal:
        {
          when : 1400,
          className: "slide--shown"
        }
    }
  ]
}).init()
