import io from 'socket.io-client';

class Socket {
	static connect () {
		var socketHost = window.location.protocol + '//' + window.location.hostname + ':8888';

		return io.connect(socketHost);
	}
}

var socket = Socket.connect();

export default socket;