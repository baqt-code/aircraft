# Pilot Dashboard

Pilot Dashboard is a web-based application designed to provide pilots with real-time information about their current flight, including aircraft details, airport data, and emergency landing sites. The dashboard fetches data from a backend server and displays it in a user-friendly interface.

## Features

- **Pilot and Aircraft Details**: Displays the pilot's ID and aircraft ID.
- **Airport Data**: Lists information about various airports, including control tower, runway details, and weather conditions.
- **Location Data**: Shows details about specific locations, including surface type, proximity distance, and weather conditions.
- **Live Location**: Fetches and displays the pilot's current geographic location using the browser's geolocation API.
- **Emergency Landing Sites**: Provides a list of potential emergency landing sites if all runways at the destination airport are engaged.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Fetches data from an API running on `localhost`
- **Styling**: External CSS for styling the dashboard and details page
- **Geolocation**: Browser's geolocation API for fetching the current location

Usage
Pilot Dashboard:

Open index.html to view the main dashboard.
The dashboard displays the pilot ID and aircraft ID fetched from the backend.
Enter various URLs in the sidebar to fetch and process data.
The airport and location data tables will be populated with relevant information.
The live location section shows the pilot's current coordinates.
Airport Details:

Click on the "Details" button in the airport data table to view specific runway details.
If all runways are engaged, emergency landing sites will be suggested.
