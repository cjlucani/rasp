// server.js

// modules =================================================
var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var Gpio            = require('onoff').Gpio;
var server          = require('http').createServer(app);
var io              = require('socket.io')(server);

// Pi GPIO
var led             = new Gpio(17, 'out');

// config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 8080;

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){

  console.log('a user connected');

  socket.on('led', function() {
    console.log('led emit');

    var state = led.readSync();

    led.writeSync(Number(!state));
    socket.emit('LEDStateChange', !state);

  });
});

// routes ==================================================
require('./app/routes')(app, Gpio); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
server.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;
