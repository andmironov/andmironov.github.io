var DOMObserver = require("./lib/DOMObserver.js")

//Shake the input

var button = document.querySelectorAll(".email-caption-button")[0]
var input = document.querySelectorAll(".email-caption-input")[0];
var inputWrap = document.querySelectorAll(".email-caption-inner")[0];

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

var taglineElement = document.querySelectorAll(".slide--top .tagline")[0]
var emailCaptionElement = document.querySelectorAll(".email-caption")[0]

observer.addElement({
  element: taglineElement,
  name:"tagline"
})

observer.addElement({
  element: emailCaptionElement,
  name:"emailCaption"
})

var scrollY = observer.getScrollY();
var viewportHeight = observer.getViewport().height;

var taglineHeight = observer.getPropertyValue("tagline", "height")
var taglineOffsetTop = observer.getPropertyValue("tagline", "offsetTop")

var emailCaptionHeight = observer.getPropertyValue("emailCaption", "height")
var emailCaptionOffsetTop = observer.getPropertyValue("emailCaption", "offsetTop")

onScrollY();

observer.addCallbacks({
  onScrollYUpdate: onScrollY
})

function onScrollY() {
  scrollY = observer.getScrollY()
  if((taglineOffsetTop - scrollY) < (viewportHeight - (taglineHeight/2))) showTagline();
  if((emailCaptionOffsetTop - scrollY) < (viewportHeight - (emailCaptionHeight/2))) showEmailCaption();
}


//tagline animation
var taglineShown = false
function showTagline() {
  if(taglineShown) return

  taglineShown = true
  setTimeout(function(){
    taglineElement.classList.add("shown")
  }, 400)
}

//email caption animation
var emailCaptionShown = false
function showEmailCaption() {
  if(emailCaptionShown) return

  emailCaptionShown = true
  setTimeout(function(){
    emailCaptionElement.classList.add("shown")
  }, 500)
}
