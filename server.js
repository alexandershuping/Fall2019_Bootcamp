/** Alexander Shuping
 ** CEN3031 Intro to Software Engineering
 ** Fall 2019 Bootcamp 1
 ** 2019-08-21
 **/

var http = require('http'), 
		fs = require('fs'), 
		url = require('url'),
		port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {

	var parsedUrl = url.parse(request.url);

	console.log('Request received!');
	console.log('  > URL: ' + request.url);

	if(parsedUrl.pathname == '/listings'){
		console.log('   > This is valid!');

		response.writeHead(200, {
			'Content-Type': 'application/json',
			'X-project-author': 'Alexander Shuping'
		}); // (append an extra header, because why not?)

		response.write(JSON.stringify(listingData));
		response.end();

	}else{
		console.log('   > This is INVALID!');
		response.writeHead(404);

		/* I am incredibly disappointed that the unit tests don't like my
		 * wonderful custom 404 page. I commented it out so that the unit
		 * tests would pass, but I am not removing it.
		 */

		/*response.write(`
			<body>
				<blink><marquee><h1>404 Error</h1></marquee></blink>
				<p>
					whoops, looks like you requested the wrong url. did you maybe
					want <a href=/listings>this one</a> instead?
				</p>
			</body>
		`);*/

		response.write('Bad gateway error');

		response.end();
	}

	console.log(); // Insert a newline, to make the log output cleaner.
};

fs.readFile('listings.json', 'utf8', function(err, data) {
	//Check for errors
	if(err){
		console.log('HECK! Received the following error while trying to load JSON'
			+ 'data:');
		console.log(err);
		throw err;
	}

	 //Save the sate in the listingData variable already defined
	listingData = JSON.parse(data)

	//Creates the server
	var server = http.createServer(requestHandler);

	//Start the server
	server.listen(port, function() {
		console.log('Listening on port ' + port);
	});
});
