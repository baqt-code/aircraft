const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use('/assets', express.static('assets'));

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'BAQT',
	database: 'emergency_landing_advisor_for_aircraft', // Updated database name
});

app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: true }));

connection.connect(function (error) {
	if (error) {
		console.error('Error connecting to MySQL database:', error);
	} else {
		console.log('Connected to MySQL database');
	}
});

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.post('/login', function (req, res) {
	const { PILOT_ID, AIRCRAFT_ID, ATC_ID, AIRPORT_ID, Password } = req.body;
	let query;
	let redirectUrl;

	if (PILOT_ID && AIRCRAFT_ID) {
		// User is a pilot
		query =
			'SELECT PILOT_ID, AIRCRAFT_ID, Password FROM pilot WHERE PILOT_ID = ? AND AIRCRAFT_ID = ? AND Password = ?';
		redirectUrl = '/pilot.html';
	} else if (ATC_ID && AIRPORT_ID) {
		// User is ATC tower
		query =
			'SELECT ATC_ID, Airport_ID, Password FROM atc_tower WHERE ATC_ID = ? AND Airport_ID = ? AND Password = ?';
		redirectUrl = '/atc.html';
	} else {
		// Invalid user
		res.status(400).send('Invalid user ID');
		return;
	}

	connection.query(
		query,
		[PILOT_ID || ATC_ID, AIRCRAFT_ID || AIRPORT_ID, Password],
		function (error, results, fields) {
			if (error) {
				console.error('Error executing query:', error);
				res.status(500).send('An error occurred while processing your request');
				return;
			}

			if (results.length > 0) {
				res.redirect(redirectUrl);
			} else {
				res.redirect('/');
			}
		}
	);
});

// APIs for retrieving pilot data
app.post('/getPilotData', function (req, res) {
	const { PILOT_ID, AIRCRAFT_ID, Password } = req.body;
	const query =
		'SELECT * FROM pilot WHERE PILOT_ID = ? AND AIRCRAFT_ID = ? AND Password = ?';

	connection.query(
		query,
		[PILOT_ID, AIRCRAFT_ID, Password],
		function (error, results, fields) {
			if (error) {
				console.error('Error executing query:', error);
				res.status(500).send('An error occurred while processing your request');
				return;
			}

			if (results.length > 0) {
				res.json(results[0]); // Sending pilot data as JSON response
			} else {
				res.status(404).send('Pilot data not found');
			}
		}
	);
});

app.listen(7500);
