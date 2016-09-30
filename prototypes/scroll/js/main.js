let Scrllr = require("./lib/Scrllr.js")
let Scale = require("d3-scale")

let scrllr = new Scrllr({onScrollCallback: cb})

let circle = document.querySelectorAll(".circle")[0]
let scales  = []
let keyframes = [
  {
    domain : [0, 1000],
    animations : [
      {
        element : circle,
        properties: [
          {name: "translateY", range: [0, 300]},
          {name: "opacity", value: .8},
        ]
      }
    ]
  }
]
scrllr.init()

keyframes.forEach((keyframe) => {
  scales = [
    Scale.scaleLinear().domain(keyframe.domain).range(keyframe.animations[0].properties[0].range)
  ]
})

console.log(scales);


function cb(scrollY) {

  keyframes.forEach((keyframe) => {
    keyframe.anymations.properties.forEach((property) => {
      
    })
  })

  console.log(scales[0](scrollY))

}
