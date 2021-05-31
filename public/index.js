document.addEventListener("DOMContentLoaded", function() {
	const socket = new WebSocket('ws://localhost:8999')
	socket.addEventListener('message', function (event) {
		const data = JSON.parse(event.data)
		document.getElementById('team-a-score').innerHTML = data.teamAScore
		document.getElementById('team-b-score').innerHTML = data.teamBScore
	});
})