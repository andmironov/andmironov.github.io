let Scrllr = require("./lib/Scrllr.js")
let Scale = require("d3-scale")
let Interpolator = require("d3-interpolate")
let Ease = require("d3-ease")

let circle = document.querySelectorAll(".circle")[0]
let rectangle = document.querySelectorAll(".rectangle")[0]

const PROPERTIES = ['translateX', 'translateY', 'opacity', 'scale']

let scales  = []
let keyframes = [
  {
    element : circle,
    domain : [0, 400],
    properties: [
      ["translateY", [0, 200]],
      ["opacity", [1, .3]],
      ["translateX", [0, 100]],
      ["scale", [1, 2]]
    ]
  },
  {
    element : rectangle,
    domain : [100, 400],
    properties: [
      ["translateY", [0, 200]],
      ["opacity", [1, .3]],
      ["translateX", [0, 100]],
      ["scale", [1, 2]]
    ]
  }
]

// 1. Create a scale for each given property
keyframes.forEach((keyframe, keyframeIndex) => {
  keyframe.properties.forEach((property) => {
    scales[property[0]] = createScale(property[0], keyframe.domain, property[1])
  })
})

console.log(scales);

// 2. Attach a callback to debounced scroll event
let scrllr = new Scrllr({onScrollCallback: cb}).init()

function cb(scrollY) {
  keyframes.forEach((keyframe) => {
    console.log( assignCSSToKeyframe(keyframe, scrollY) )
  })
}

function assignCSSToKeyframe(keyframe, scrollY) {
  let CSS = new Object()

  PROPERTIES.forEach((property) => {
    CSS[property] = getPropertyValue(property, scales, scrollY)
  })

  keyframe.element.style.transform = 'translate3d(' + CSS.translateX +'px, ' + CSS.translateY + 'px, 0) scale('+ CSS.scale +')'
  keyframe.element.style.opacity = CSS.opacity
}

function getPropertyValue(property, scales, scrollY) {
  if (scales.hasOwnProperty(property)) {
    return scales[property](scrollY)
  } else {
    return getDefaultPropertyValue(property)
  }
}

function getDefaultPropertyValue(property) {
  switch (property) {
    case 'translateX':
      return 0
    case 'translateY':
      return 0
    case 'scale':
      return 1
    case 'rotate':
      return 0
    case 'opacity':
      return 1
    default:
      return null
  }
}

function createScale(property, domain, range) {
  switch (property) {
    case 'translateX':
    case 'translateY':
    case 'scale':
    case 'opacity':
      return Scale.scaleLinear().domain(domain).range(range).interpolate(easeInterpolate(Ease.easePolyIn)).clamp(true)
    default:
      return null
  }
}

function easeInterpolate(ease) {
  return function(a, b) {
    var i = Interpolator.interpolate(a, b)
    return function(t) {
      return i(ease(t))
    }
  }
}
