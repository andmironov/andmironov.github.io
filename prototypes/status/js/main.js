let ScrollOver = require("./lib/ScrollOver.js")

let body = document.querySelectorAll("body")[0]
let tagline = document.querySelectorAll(".tagline")[0]

let iphone = document.querySelectorAll(".phone-wrap--iphone")[0],
    android = document.querySelectorAll(".phone-wrap--android")[0],
    features = document.querySelectorAll(".features-wrap")[0],
    slideTwo = document.querySelectorAll(".slide--two")[0],
    slideThree = document.querySelectorAll(".slide--three")[0],
    points = document.querySelectorAll(".points")[0],
    circles = document.querySelectorAll(".circles")[0]


setTimeout(() => body.classList.add("shown"), 400)

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
          range : [0, 90]
        }
      ]
    },
    {
      element : features,
      domain : [0, 800],
      animate: [
        {
          property : "translateY",
          range : [0, -100]
        }
      ]
    },
    {
      element : slideTwo,
      reveal:
        {
          when : 400,
          className: "slide--shown"
        }

    },
    {
      element : slideThree,
      reveal:
        {
          when : 1300,
          className: "slide--shown"
        }

    }
  ]
}).init()
