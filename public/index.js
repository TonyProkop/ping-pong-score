document.addEventListener("DOMContentLoaded", function() {
	const socket = new WebSocket(`ws://${window.location.hostname}:3001`)
	socket.addEventListener('message', function (event) {
		const data = JSON.parse(event.data)
		document.getElementById('team-a-score').innerHTML = data.teamAScore
		document.getElementById('team-b-score').innerHTML = data.teamBScore
	});
})

const teamAUpButton = document.querySelector('.team-a .up-button');
const teamADownButton = document.querySelector('.team-a .down-button');
const teamBUpButton = document.querySelector('.team-b .up-button');
const teamBDownButton = document.querySelector('.team-b .down-button');
const resetButton = document.querySelector('.reset-button');

if (teamAUpButton) {
	teamAUpButton.addEventListener("click", function () {
		fetch('/a/up', {
			method: 'PUT'
		})
	})
}

if (teamADownButton) {
	teamADownButton.addEventListener("click", function () {
		fetch('/a/down', {
			method: 'PUT'
		})
	})
}

if (teamBUpButton) {
	teamBUpButton.addEventListener("click", function () {
		fetch('/b/up', {
			method: 'PUT'
		})
	})
}

if (teamBDownButton) {
	teamBDownButton.addEventListener("click", function () {
		fetch('/b/down', {
			method: 'PUT'
		})
	})
}

if (resetButton) {
	resetButton.addEventListener("click", function () {
		fetch('/reset', {
			method: 'PUT'
		})
	})
}
