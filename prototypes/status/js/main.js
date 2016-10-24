let ScrollOver = require("./lib/ScrollOver.js")

let body = document.querySelectorAll("body")[0]
let tagline = document.querySelectorAll(".tagline")[0]

let iphone = document.querySelectorAll(".phone-wrap--iphone")[0]
let android = document.querySelectorAll(".phone-wrap--android")[0]
let features = document.querySelectorAll(".features-wrap")[0]
let slideTwo = document.querySelectorAll(".slide--two")[0]

setTimeout(() => body.classList.add("shown"), 400)

new ScrollOver({
  keyframes : [
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
          when : 600,
          className: "slide--shown"
        }

    }
  ]
}).init()
