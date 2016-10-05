let ScrollOver = require("./lib/ScrollOver.js")

let body = document.querySelectorAll("body")[0]

let tagline = document.querySelectorAll(".tagline")[0]
let iphone = document.querySelectorAll(".phone--iphone")[0]
let android = document.querySelectorAll(".phone--android")[0]
let textBlock = document.querySelectorAll(".text-block")[0]
setTimeout(() => body.classList.add("shown"), 400)

new ScrollOver({
  keyframes : [
    {
      element : iphone,
      domain : [0, 600],
      animate: [
        {
          property : "translateY",
          range : [0, 120]
        }
      ]
    },
    {
      element : android,
      domain : [0, 600],
      animate: [
        {
          property : "translateY",
          range : [0, 90]
        }
      ]
    }
  ]
}).init()
