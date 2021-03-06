const express = require('express')
const WebSocket = require('ws')
const http = require('http')
const app = express()
const port = 3000
const wsPort = 3001

app.use(express.static('public'))
app.use(express.json())
app.set('view engine', 'pug')

// DB Stuff
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(':memory:')
db.serialize(function () {
	db.run('CREATE TABLE score (a int, b int)')
	db.run('INSERT INTO score VALUES (0, 0)')
})

// WebSocket Stuff
const wsServer = http.createServer(app);
const wss = new WebSocket.Server({ server: wsServer });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
		wss.clients
			.forEach(client => {
				client.send(`Hello, broadcast message -> ${message}`);
			});
    });

	sendScoreToClients()
});

wsServer.listen(wsPort, () => {
    console.log(`Server started on port ${wsServer.address().port}.`);
});

const sendScoreToClients = (score) => {
	db.get('SELECT a, b FROM score', function (err, row) {
		console.log(row.a + ' : ' + row.b)
		wss.clients
			.forEach(client => {
				client.send(JSON.stringify({
					teamAScore: row.a,
					teamBScore: row.b,
				}));
			});
	})
}

// Routing Stuff
app.get('/', (req, res) => {
	express.static(__dirname + '/index.html')(req, res, next);
})

app.get('/a/controls', (req, res) => {
	res.render('controls', { team: 'a' })
})

app.get('/b/controls', (req, res) => {
	res.render('controls', { team: 'b' })
})

app.put('/a/up', (req, res) => {
	db.run('UPDATE score SET a = a + 1')
	sendScoreToClients()
	res.send()
})

app.put('/a/down', (req, res) => {
	db.run('UPDATE score SET a = a - 1')
	sendScoreToClients()
	res.send()
})

app.put('/b/up', (req, res) => {
	db.run('UPDATE score SET b = b + 1')
	sendScoreToClients()
	res.send()
})

app.put('/b/down', (req, res) => {
	db.run('UPDATE score SET b = b - 1')
	sendScoreToClients()
	res.send()
})

app.put('/reset', (req, res) => {
	db.run('UPDATE score SET a = 0, b = 0')
	sendScoreToClients()
	res.send()
})

app.listen(port, () => {
	console.log(`Ping pong app listening at http://localhost:${port}`)
})