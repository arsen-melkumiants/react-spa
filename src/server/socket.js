const socket = require('express')();
const server = require('http').Server(socket).listen(8888);
const io = require('socket.io')(server);

// It could be any DB or file driver used as a storage
let messageStore = [{
	id: 1,
	type: 'MESSAGE',
	userID: 'TestUser1',
	name: 'Leo',
	text: 'Hi, Tomas'
}, {
	id: 2,
	type: 'MESSAGE',
	userID: 'TestUser2',
	name: 'Tomas',
	text: 'Hi, Nice to see you.\nHow are you?'
}];

io.on('connection', (socket) => {
	console.log('user connected');

	socket.on('last_messages', () => {
		socket.emit('last_messages', messageStore);
	});

	socket.on('send_message', (data) => {
		let message = {
			id: messageStore.length + 1,
			type: 'MESSAGE',
			userID: socket.id.replace('/#', ''),
			name: data.name,
			text: data.text
		};

		messageStore.push(message);
		io.emit('new_message', message);
	});

	socket.on('change_name', (data) => {
		let message = {
			id: messageStore.length + 1,
			type: 'NOTICE',
			text: `User **${data.oldName}** has changed the name to **${data.newName}**`
		};

		messageStore.push(message);
		io.emit('new_message', message);
	});

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});
