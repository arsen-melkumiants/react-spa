import io from 'socket.io-client';

class Socket {
	static connect () {
		return io.connect('http://localhost:8888');
	}
}

var socket = Socket.connect();

export default socket;