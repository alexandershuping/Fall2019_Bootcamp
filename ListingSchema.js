/** Schema to hold location information
  * 
	* Each location has a full name (e.g. "New Engineering Building"), as well as
	* a short-form code (e.g. "NEB"), which is usually either three or four
	* letters but which is NOT GUARANTEED to be this long.
	* 
	* Additionally, each location has a set of geographic coordinates and a
	* street address.
	*/

var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var listingSchema = new Schema({
	name: {               // Full name of location
		type: String,
		required: true
	},
	code: {               // Short code, if applicable
		type: String,
		required: true
	},
	coordinates: {        // Geographic coordinates
		latitude: Number,
		longitude: Number
	},
	address: String,      // Street address, if applicable
	created_at: Date,     // Date this entry was added to the database
	updated_at: Date      // Date this entry was last modified
});

// pre-method to ensure that created-at and updated-at dates are accurate.
listingSchema.pre('save', function(next) {
  var now = new Date()
	this.updated_at = now
	if(!this.created_at){
		this.created_at = now
	}

	next()
});

// A single, global model object is made available throughout the application.
var Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
