document.addEventListener("DOMContentLoaded", function() {
	const socket = new WebSocket(`ws://${window.location.hostname}:3001`)
	socket.addEventListener('message', function (event) {
		const data = JSON.parse(event.data)
		document.getElementById('team-a-score').innerHTML = data.teamAScore
		document.getElementById('team-b-score').innerHTML = data.teamBScore
	});
})