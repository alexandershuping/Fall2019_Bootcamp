/* Add all the required libraries*/
var mongoose = require('mongoose')
var config = require('./config')
var Listing = require('./ListingSchema')

// Connect to database
mongoose.connect(
	config.db.uri,
	// the computer was yelling at me about deprecated things, so I added these
	// options to make it stop
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	}
)

/* Fill out these functions using Mongoose queries*/
//Check out - https://mongoosejs.com/docs/queries.html

var findLibraryWest = function() {
	Listing.findOne(
		// NOTE: wasn't sure what Library West would show up as, so I ran a regex
		//       query to match most reasonable possibilities
		{name: {$regex: /library.*west/i}},
		function (err, listing){
			console.log(listing)
		}
	)
};

var removeCable = function() {
	 Listing.findOneAndRemove(
	 	{code: 'CABL'}, 
			function (err, listing){
				console.log(listing)
			}
	 )
};

var updatePhelpsLab = function() {
	// NOTE: I use findOne() and then save() here instead of findOneAndUpdate()
	//       because the latter does not appear to actually call the save()
	//       method, and thus our pre-save method which updates updated-at never
	//       gets called.
	Listing.findOne(
		{code: 'PHL'}, 
		function(err, listing){
			if(err){
				throw err
			}

			listing.address = '1953 Museum Rd, Gainesville, FL 32603, United States'
			listing.save(function(err){
				if(err){
					throw err
				}

				Listing.findOne(
					{code: 'PHL'},
					function(err, new_listing){
						if(err){
							throw err
						}

						console.log(new_listing)
					}
				)
			})
		}
	)
};

var retrieveAllListings = function() {
	Listing.find(
		{},
		function (err, listing){
			console.log(listing)
		}
	)
};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
