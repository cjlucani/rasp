// app/routes.js

module.exports = function(app, Gpio) {

  var led = new Gpio(17, 'out');

  // sample api route
  app.get('/led', function(req, res) {

    var iv = setInterval(function(){
      led.writeSync(led.readSync() === 0 ? 1 : 0)
    }, 500);

    // Stop blinking the LED and turn it off after 5 seconds.
    setTimeout(function() {
      clearInterval(iv); // Stop blinking
      led.writeSync(0);  // Turn LED off.
      led.unexport();    // Unexport GPIO and free resources
    }, 5000);

    res.send('fabulous');
  });

  // frontend routes =========================================================
  // route to handle all angular requests
  app.get('/', function(req, res) {
      res.sendfile('./public/views/index.html'); // load our public/index.html file
  });

};
