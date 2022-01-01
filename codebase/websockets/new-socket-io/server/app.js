const app = require('express');
const http = require('http').createServer(app);

var io = require('socket.io')(http, {
	cors: {
		origin: '*',
		methods: [ 'GET', 'POST' ]
	}
});

// io.on("connection", (socket) => {
//   socket.join("some room");
// });

// io.to("some room").emit"some event")(;

// io.on("connection", (socket) => {
//   socket.to("some room").emit("some event");
// });


io.on('connection', (socket) => {
	/* socket object may be used to send specific messages to the new connected client */
	console.log('new client connected');
	socket.emit('connection', null);
	socket.on('user_join', (name) => {
		this.username = name;
		console.log(name);
		socket.broadcast.emit('user_join', name);
	});

	socket.on('message', ({ name, message }) => {
		console.log(name, message);
		io.emit('message', { name, message });
	});

	socket.on('disconnect', () => {
		console.log('Disconnect Fired');
		//socket.broadcast.emit('user_leave', `${this.username} has left`);
	});

	socket.on('create', function (room) {
		socket.join(room);
	});

	socket.on('room_join', ({roomName, userName}) =>{
		console.log(roomName, userName);
		io.to(roomName).emit(roomName, userName);
		io.emit('room_joined', {roomName,userName});
	});
});

// io.sockets.in(room).emit('event', data);

http.listen(4000, () => {
	console.log(`listening on *:${4000}`);
});
