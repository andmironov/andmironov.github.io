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
