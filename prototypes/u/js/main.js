let ScrollOver = require("./lib/ScrollOver.js")

let tagline = document.querySelectorAll(".tagline")[0]
let iphone = document.querySelectorAll(".phone--iphone")[0]
let android = document.querySelectorAll(".phone--android")[0]
let textBlock = document.querySelectorAll(".text-block")[0]


new ScrollOver({
  keyframes : [


    {
      element : iphone,
      domain : [0, 500],
      animate: [
        {
          property : "translateY",
          range : [0, 100]
        }
      ]
    },
    {
      element : android,
      domain : [0, 500],
      animate: [
        {
          property : "translateY",
          range : [0, 80]
        }
      ]
    },

  ]
}).init()
