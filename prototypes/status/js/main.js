let ScrollOver = require("./lib/ScrollOver.js")
let Particles = require("./lib/Particles.js")
let body = document.querySelectorAll("body")[0]
let tagline = document.querySelectorAll(".tagline")[0]
let iphone = document.querySelectorAll(".phone--iphone")[0]
let android = document.querySelectorAll(".phone--android")[0]
let textBlock = document.querySelectorAll(".text-block")[0]

//setTimeout(() => body.classList.add("shown"), 400)

new ScrollOver({
  keyframes : [
    {
      element : iphone,
      domain : [0, 800],
      animate: [
        {
          property : "translateY",
          range : [0, 200]
        }
      ]
    },
    {
      element : android,
      domain : [0, 800],
      animate: [
        {
          property : "translateY",
          range : [0, 140]
        }
      ]
    },
    {
      element : android,
      reveal: {
          when : 300,
          className : "show",
      }
    }
  ]
}).init()
