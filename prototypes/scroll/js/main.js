let ScrollOver = require("./lib/ScrollOver.js")

let circle = document.querySelectorAll(".circle")[0]
let rectangle = document.querySelectorAll(".rectangle")[0]

//ds
new ScrollOver({
  keyframes : [
    {
      element : rectangle,
      domain : [0, 400],
      animate: [
        {
          property : "translateX",
          range : [0, 200]
        },
        {
          property : "opacity",
          range : [1, .1]
        },
        {
          property : "scale",
          range : [1, 1.5]
        }
      ]
    },
    {
      element : circle,
      domain : [0, 400],
      animate: [
        {
          property : "translateY",
          range : [0, 200]
        }
      ]
    }
  ]
}).init()
