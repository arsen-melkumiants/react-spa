import io from 'socket.io-client';

class Socket {
	static connect() {
		let socketHost = `${window.location.protocol}//${window.location.hostname}:3001`;

		return io.connect(socketHost);
	}
}

export default Socket.connect();
