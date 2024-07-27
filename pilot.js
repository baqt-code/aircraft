document.addEventListener('DOMContentLoaded', async function () {
	try {
		const response = await fetch('http://localhost:8000/getPilotData');
		const data = await response.json();
		console.log(data, 'data');
		document.getElementById('pilot-id').innerText = data.PILOT_ID;
		document.getElementById('aircraft-id').innerText = data.AIRCRAFT_ID;

	} catch (error) {
		console.error('Error fetching pilot details:', error);
	}
});
