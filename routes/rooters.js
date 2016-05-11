var express = require('express');
var rooters = express.Router(); 
var Promise = require('bluebird');
var model = require('../models/index');
var Place = model.Place;
var Restaurant = model.Restaurant;
var Activity = model.Activity;
var Hotel = model.Hotel;

rooters.get('/', function(req, res){
	Promise.all([
		Place.findAll(), 
		Restaurant.findAll(),
		Activity.findAll(),
		Hotel.findAll()])
	.spread(function(places, restaurants, activities, hotels){
		res.render('index', {places, restaurants, activities, hotels}); 
	})
});

rooters.get('/investors', function(req, res){
	res.redirect('https://www.google.com/search?q=images+of+taylor+swift&espv=2&biw=1920&bih=919&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjj_vLpndLMAhXMQD4KHV-VCxoQ_AUIBigB&dpr=1');
});

rooters.get('/about', function(req, res){
	res.redirect('https://en.wikipedia.org/wiki/Taylor_Swift');
});

rooters.get('/contact', function(req, res){
	res.redirect('http://www.taylorswiftweb.net/contact/');
});

module.exports = rooters; 
