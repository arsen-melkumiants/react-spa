var socket = require('express')();
var server = require('http').Server(socket).listen(8888);
var io = require('socket.io')(server);

//It could be any DB or file driver used as a storage
var messageStore = [{
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

io.on('connection', socket => {
	console.log('user connected');

	socket.on('last_messages', () => {
		socket.emit('last_messages', messageStore);
	})

	socket.on('send_message', data => {
		var message = {
			id: messageStore.length + 1,
			type: 'MESSAGE',
			userID: socket.id.replace('/#', ''),
			name: data.name,
			text: data.text
		};

		messageStore.push(message);
		io.emit('new_message', message);
	});

	socket.on('change_name', data => {
		var message = {
			id: messageStore.length + 1,
			type: 'NOTICE',
			text: 'User **' + data.oldName +
				  '** has changed the name to **' + data.newName + '**'
		};

		messageStore.push(message);
		io.emit('new_message', message);
	});

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});