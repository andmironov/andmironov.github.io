var DOMObserver = require("./lib/DOMObserver.js")

//Shake the input

var button = document.querySelectorAll(".email-caption-button")[0]
var input = document.querySelectorAll(".email-caption-input")[0]
var inputWrap = document.querySelectorAll(".email-caption-inner")[0]

button.addEventListener("click", function(){
  shakeInput()
})

input.addEventListener("focus", function(){
  focusInput()
})

var inputIsShaking = false
function shakeInput() {
  if(!inputIsShaking) {
    inputIsShaking = true;
    inputWrap.classList.add("shaky")

    setTimeout(function(){
      inputWrap.classList.remove("shaky")
      inputIsShaking = false;
    }, 800)
  }
}

var inputIsFocusing = false
function focusInput() {
  if(!inputIsFocusing) {
    inputIsFocusing = true;
    inputWrap.classList.add("focused")

    setTimeout(function(){
      inputWrap.classList.remove("focused")
      inputIsFocusing = false;
    }, 400)
  }
}

//Add observer
var observer = new DOMObserver();

var mainSlideElement = document.querySelectorAll(".slide--top")[0]
var colorfulSlideElement = document.querySelectorAll(".slide--colorful")[0]
var colorfulSlideBlocksElements = document.querySelectorAll(".colorful-blocks .colorful-block")
var taglineElement = document.querySelectorAll(".slide--top .tagline")[0]
var emailCaptionElement = document.querySelectorAll(".email-caption")[0]
var headerElement = document.querySelectorAll(".header")[0]

observer.addElement({
  element: mainSlideElement,
  name:"mainSlide"
})

observer.addElement({
  element: colorfulSlideElement,
  name:"colorfulSlide"
})


var scrollY = observer.getScrollY()
var viewportHeight = observer.getViewport().height

var mainSlideHeight = observer.getPropertyValue("mainSlide", "height")
var mainSlideOffsetTop = observer.getPropertyValue("mainSlide", "offsetTop")

var colorfulSlideHeight = observer.getPropertyValue("colorfulSlide", "height")
var colorfulSlideOffsetTop = observer.getPropertyValue("colorfulSlide", "offsetTop")

onScrollY()

observer.addCallbacks({
  onScrollYUpdate: onScrollY
})

function onScrollY() {
  scrollY = observer.getScrollY()
  if((mainSlideOffsetTop - scrollY) < (viewportHeight - (mainSlideHeight/2))) showMainSlide();
  if((colorfulSlideOffsetTop - scrollY) < (viewportHeight - (colorfulSlideHeight/2))) showColorfulSlide();
}


//showMainSlide animation
var mainSlideShown = false
function showMainSlide() {
  if(mainSlideShown) return
  mainSlideShown = true
  setTimeout(function(){taglineElement.classList.add("shown")}, 400)
  setTimeout(function(){emailCaptionElement.classList.add("shown")}, 500)
  setTimeout(function(){headerElement.classList.add("shown")}, 1000)
}

//showColorfulSlide animation
var colorfulSlideShown = false
function showColorfulSlide() {
  if(colorfulSlideShown) return
  colorfulSlideShown = true

  for (var i = colorfulSlideBlocksElements.length; i--;){
    showColorfulSlideBlock(i)
  }
}

function showColorfulSlideBlock(i) {
  setTimeout(function(){
    colorfulSlideBlocksElements[i].classList.add("shown")
  }, i*120)
}
