let Scrllr = require("./Scrllr.js"),
    Scale = require("d3-scale"),
    Interpolator = require("d3-interpolate"),
    Ease = require("d3-ease")

function ScrollOver(options) {
  options = extend(options, ScrollOver.options)
  this.PROPERTIES = ['translateX', 'translateY', 'opacity', 'scale']
  this.keyframes = options.keyframes
}

ScrollOver.prototype = {
  constructor : ScrollOver,

  init : function() {

    new Scrllr({onScrollCallback:update.bind(this)}).init()

    this.keyframes.forEach((keyframe) => {
      keyframe.animate.forEach((property) => {
        property.scale = this.createScale(property.property, keyframe.domain, property.range)
      })
    })

    function update(scrollY) {
      this.keyframes.forEach((keyframe) => {
        this.updateCSS(keyframe.element, this.calculatePropertyValues(keyframe.animate, scrollY))
      })
    }
    return this
  },



  calculatePropertyValues: function(animations, scrollY) {
    let CSSValues = new Object()

    this.PROPERTIES.forEach((propertyName) => {
      CSSValues[propertyName] = this.getDefaultPropertyValue(propertyName)
      animations.forEach((animation) => {
        if (animation.property == propertyName) CSSValues[propertyName] = this.scaleValue(animation.scale, scrollY)
      })
    })

    return CSSValues
  },

  scaleValue: function(scale, scrollY) {
    return scale(scrollY)
  },

  updateCSS: function(element, CSS) {
    element.style.transform = 'translate3d(' + CSS.translateX +'px, ' + CSS.translateY + 'px, 0) scale('+ CSS.scale +')'
    element.style.opacity = CSS.opacity
  },

  getDefaultPropertyValue: function(propertyName) {
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
  },

  createScale: function(propertyName, domain, range) {
    switch (propertyName) {
      case 'translateX':
      case 'translateY':
      case 'scale':
      case 'opacity':
        return Scale.scaleLinear().domain(domain).range(range).interpolate(this.easeInterpolate(Ease.easePolyIn)).clamp(true)
      default:
        return null
    }
  },

  easeInterpolate: function(ease) {
    return function(a, b) {
      var i = Interpolator.interpolate(a, b)
      return function(t) {
        return i(ease(t))
      }
    }
  }

}

ScrollOver.options = {
  keyframes : {}
}

/**
 * Helper function for extending objects
 */
function extend (object /*, objectN ... */) {
  if(arguments.length <= 0) {
    throw new Error('Missing arguments in extend function');
  }

  var result = object || {},
      key,
      i;

  for (i = 1; i < arguments.length; i++) {
    var replacement = arguments[i] || {};

    for (key in replacement) {
      // Recurse into object except if the object is a DOM element
      if(typeof result[key] === 'object' && ! isDOMElement(result[key])) {
        result[key] = extend(result[key], replacement[key]);
      }
      else {
        result[key] = result[key] || replacement[key];
      }
    }
  }

  return result;
}

/**
 * Check if object is part of the DOM
 * @constructor
 * @param {Object} obj element to check
 */
function isDOMElement(obj) {
  return obj && typeof window !== 'undefined' && (obj === window || obj.nodeType);
}

module.exports = ScrollOver
