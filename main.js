var express = require('express');
var app = express();
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);

let onlineCount = 0;

app.use(express.static(path.join(__dirname)));

io.on('connection', (socket) => {
	onlineCount++;

	io.emit('online', onlineCount);

	socket.on('disconnect', () => {
		onlineCount = (onlineCount < 0 ? 0 : onlineCount-1);
		io.emit("online", onlineCount);
	});
});

server.listen(8888, () => {
	console.log('server started');
});
