let Scrllr = require("./lib/Scrllr.js")

let scrllr = new Scrllr({ onScrollCallback: function cb(currentScrollY) {
  console.log(currentScrollY)
}})
scrllr.init()
