// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

const getTimestamp = (date) => ({
	unix: date.getTime(),
	utc: date.toUTCString(),
});
// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
	res.json({ greeting: 'hello API' });
});

app.get('/api/:date?', (req, res) => {
	res.send({ unix: 1451001600000, utc: 'Thu, 01 Jan 1970 00:00:00 GMT' });
});

app.get('/api/date', (req, res) => {
	const dateString = req.url.split('/api/date/')[1];
	let timestamp;
	if (dateString === undefined || dateString.trim() === '') {
		timestamp = getTimestamp(new Date());
	} else {
		const date = !isNaN(dateString) ? new Date(parseInt(dateString)) : new Date(dateString);

		if (!isNaN(date.getTime())) {
			timestamp = getTimestamp(date);
		} else {
			timestamp = {
				error: 'invalid date',
			};
		}
	}
	res.send(JSON.stringify(timestamp));
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
	console.log('Your app is listening on port ' + listener.address().port);
});
