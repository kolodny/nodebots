var five = require("johnny-five"),
  Promise = require('bluebird'),
  codes = require('./codes'),
    // or "./lib/johnny-five" when running from the source
  board = new five.Board();

  // setTimeout(function() {
  //   process.exit()
    
  // }, 100)
board.on("ready", function() {

  // Create an Led on pin 13 and strobe it on/off
  // Optionally set the speed; defaults to 100ms
  var led = new five.Led(13);
  var button = new five.Button(8);
  // led.strobe();
  // button.on("down", function() {
  //   led.toggle();
  // });
  // button.on("up", function() {
  //   led.toggle();
  // });
  displayMessage('sos', led)
  // this.repl.inject({
  //   led: led,
  //   button: button
  // });
});


function displayMessage(str, led) {
  console.log('get ready');
  setTimeout(function() {
    var chain = Promise.resolve();
    var symbols = [];
    next()
    function next() {
      if (!symbols.length) {
        if (!str) return process.exit();
        symbols = codes[str[0].toUpperCase()].split('');
        symbols = symbols.map(function(c) {return c + c}).join('').split('')
        str = str.substr(1);
      }
      var symbol = symbols.shift();
      console.log('toggle')
      led.toggle();
      setTimeout(next, symbol == '.' ? 200 : 400);
    }
  }, 1000)
}
