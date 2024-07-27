const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors")
const path = require('path');


const app = express();
app.use(cors())
app.use('/assets', express.static('assets'));
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'BAQT',
	database: 'emergency landing advisor for aircraft', // Updated database name
});

app.use(express.json());

 app.use(bodyParser.urlencoded({ extended: true }));

connection.connect(function (error) {
	if (error) {
		console.error('Error connecting to MySQL database:', error);
	} else {
		console.log('Connected to MySQL database');
	}
});
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});
app.get('/pilot', function (req, res) {
	res.sendFile(__dirname + '/pilot.html');
});

app.get('/atc', function (req, res) {
	res.sendFile(__dirname + '/atc.html');
});
app.get('/airportdetails', (req, res) => {
    res.sendFile(__dirname + '/airportdetails.html');
});
app.get('/emergency', (req, res) => {
    res.sendFile(__dirname + '/atc.html');
});
app.post('/login', function (req, res)
 {  console.log(req.body)
	const { PILOT_ID, AIRCRAFT_ID, ATC_ID, AIRPORT_ID, Password } = req.body;
	let query;
	let redirectUrl;

	if (PILOT_ID && AIRCRAFT_ID) {
		// User is a pilot
		query =
			'SELECT PILOT_ID, AIRCRAFT_ID, Password FROM pilot WHERE PILOT_ID = ? AND AIRCRAFT_ID = ? AND Password = ?';
		redirectUrl = '/pilot';
	} else if (ATC_ID && AIRPORT_ID) {
		// User is ATC tower
		query =
			'SELECT ATC_ID, Airport_ID, Password FROM atc_tower WHERE ATC_ID = ? AND Airport_ID = ? AND Password = ?';
		redirectUrl = '/atc';
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
// for runway 
app.get('/runway', function (req, res) {
    const { AIRPORT_ID } = req.query;
    console.log(AIRPORT_ID, "xyz");
    const query = 'SELECT * FROM runway WHERE AIRPORT_ID = ?';

    connection.query(query, [AIRPORT_ID], function (error, results, fields) {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('An error occurred while processing your request');
            return;
        }

        if (results.length > 0) {
            console.log(results);
            res.json(results);
        } else {
            res.status(404).send('No runways found');
        }
    });
});
//for emergency
app.get('/emergencylanding', function (req, res) {
	const query = 'SELECT * FROM emergency_landing';
	
	connection.query(
	  query,
	  [],
	  function (error, results, fields) {
		if (error) {
		  console.error('Error executing query:', error);
		  res.status(500).send('An error occurred while processing your request');
		  return;
		}
  
		if (results.length > 0) {
		  //console.log(results);
		  res.json(results);
		} else {
		  res.status(404).send('No airports found');
		}
	  }
	);
  });

// APIs for retrieving pilot data
app.get('/getPilotData', function (req, res) {
	const PILOT_ID = 'PLT001';
	const AIRCRAFT_ID = 'N45678';
	const Password = 'ABC';
  
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
		  //console.log(results[0]); // Logging the pilot data to the console
		  res.json(results [0]); // Sending pilot data as JSON response
		} else {
		  res.status(404).send('Pilot data not found');
		}
	  }
	);
  });
  app.get('/airport', function (req, res) {
	const query = 'SELECT * FROM airport';
	
	connection.query(
	  query,
	  [],
	  function (error, results, fields) {
		if (error) {
		  console.error('Error executing query:', error);
		  res.status(500).send('An error occurred while processing your request');
		  return;
		}
  
		if (results.length > 0) {
		  //console.log(results);
		  res.json(results);
		} else {
		  res.status(404).send('No airports found');
		}
	  }
	);
  });
  app.get('/landing', function (req, res) {
	const query = 'SELECT * FROM emergency_landing_site';

	connection.query(query, [], function (error, results, fields) {
		if (error) {
			console.error('Error executing query:', error);
			res.status(500).send('An error occurred while processing your request');
			return;
		}

		if (results.length > 0) {
			//console.log(results); // Logging the airport data to the console
			res.json(results); // Sending airport data as JSON response
		} else {
			res.status(404).send('No airports found');
		}
	});
});
app.listen(8000);
