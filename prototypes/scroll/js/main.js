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
  },
  {
    element : circle,
    domain : [100, 400],
    animate: [
      {
        property : "opacity",
        range : [1, .5]
      }
    ]
  }
]

// 1. Create a scale for each property
keyframes.forEach((keyframe) => {
  keyframe.animate.forEach((property) => {
    property.scale = createScale(property.property, keyframe.domain, property.range)
  })
})

// 2. Find unique elements
let elements = keyframes.map((keyframe) => { return keyframe.element })
let uniqueElements = elements.filter((elem, pos, arr) => { return arr.indexOf(elem) == pos })


// 3. Attach a callback to debounced scroll event
let scrllr = new Scrllr({onScrollCallback: cb}).init()

function cb(scrollY) {
  keyframes.forEach((keyframe) => {
    //updateCSS(keyframe.element, calculatePropertyValues(keyframe.animate, scrollY))
    calculatePropertyValues(keyframe.element, keyframe.animate, scrollY)
  })
}

function calculatePropertyValues(element, animations, scrollY) {
  let calculatedValues = {}
  animations.forEach((animation) => {
    calculatedValues["element"] = element
    calculatedValues[animation.property] = scaleValue(animation.scale, scrollY)
  })

  return calculatedValues
}

function scaleValue(scale, scrollY) {
  return scale(scrollY)
}

function updateCSS(element, CSS) {
  element.style.transform = 'translate3d(' + CSS.translateX +'px, ' + CSS.translateY + 'px, 0) scale('+ CSS.scale +')'
  element.style.opacity = CSS.opacity
}

function getDefaultPropertyValue(propertyName) {
  switch (propertyName) {
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

function createScale(propertyName, domain, range) {
  switch (propertyName) {
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
