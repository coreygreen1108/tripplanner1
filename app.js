var express = require('express');
var app = express();
var morgan = require('morgan');
var path = require('path');
var rooters = require('./routes/rooters');

var bower = require("bower");

var bodyparser = require('body-parser');
bodyparse_url = bodyparser('urlencoded');
bodyparse_json = bodyparser('json');

var swig = require('swig');
app.set('views', path.join(__dirname + '/views')); 
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({ cache: false });

var model = require('./models/index');
var Place = model.Place;
var Restaurant = model.Restaurant;
var Activity = model.Activity;
var Hotel = model.Hotel;

Place.sync()
	.then(function(){
		return Restaurant.sync();
	})
	.then(function(){
		return Activity.sync();
	})
	.then(function(){
		return Hotel.sync();
	})
	.then(function(){
		app.listen(3000, function(){
			console.log("we're listening on port 3000!");
		});	
	})
 


app.use(morgan('dev'));
app.use(bodyparse_url);
app.use(bodyparse_json);

app.use(express.static('./public'));
app.use('/', rooters);
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));
app.use('/jquery', express.static('./node_modules/jquery/dist'));


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error(err);
  res.render('error', {error: err});
});

