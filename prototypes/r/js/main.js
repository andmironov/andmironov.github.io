let Scrllr = require("./lib/Scrllr.js"),
    forEach = require('lodash.foreach')

let scrllr = new Scrllr({
  onScrollCallback: cb

})
scrllr.init()


let slides = document.querySelectorAll(".slide");

forEach(slides, function() {

})

let currentScrollY = 0

function getElementProperties(el) {
  let rect = el.getBoundingClientRect()
    return {
      offsetTop: rect.top + (currentScrollY - document.body.clientTop),
      height: rect.height,
      width: rect.width
    }
}

function cb() {
  currentScrollY = scrllr.getScrollY()
  //console.log(getElementProperties(slides[1]))

}
