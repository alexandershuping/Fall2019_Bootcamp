'use strict';

// Script to populate the database with entries from listings.json.

var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

// Connect to database
mongoose.connect(
	config.db.uri,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
)

// Read in JSON data
fs.readFile('listings.json', 'utf8', function(err, data){
	if(err){
		throw err
	}

	// Parse JSON data
	var json_data = JSON.parse(data)
	
	// Iterate through all landmarks
	var landmark
	for(landmark of json_data.entries){
		// Insert each landmark into the database
		var landmark_data = Listing(landmark)
		landmark_data.save(function(err){
			if(err){
				throw err
			}
		})
	}
})
