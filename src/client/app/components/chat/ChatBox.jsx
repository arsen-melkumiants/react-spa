import React from 'react';
import socket from 'socket';

import 'chat/less/chat.less';

import ChatList from 'chat/ChatList';
import ChatForm from 'chat/ChatForm';

//Needs for unsubscribing particular events when component is unmounted
//bind() can't be used for this case
var _this;

class chatBox extends React.Component {
	constructor () {
		super();

		this.state = {
			userID: socket.id || '',
			messages: []
		};
		_this = this;
	}

	showLastMessages(messageList) {
		_this.setState({ messages: messageList });
	}

	showNewMessage(message) {
		_this.setState({ messages: _this.state.messages.concat([message]) });
	}

	loadMessages () {
		socket
			.on('last_messages', this.showLastMessages)
			.on('new_message', this.showNewMessage)
			.emit('last_messages');
	}

	onMessageSubmit (message) {
		socket.emit('send_message', message);
	}

	componentWillMount () {
		if (this.state.userID) {
			return this.loadMessages();
		}

		socket.on('connect', () => {
			this.setState({ userID: socket.id });
			this.loadMessages();
		});
	}

	componentWillUnmount () {
		socket
			.off('new_message', this.showNewMessage)
			.off('last_messages', this.showLastMessages);
	}

	render () {
		return (
			<div className="chat-box">
				<ChatList
					messages={ this.state.messages }
					userID={ this.state.userID }
				/>
				<ChatForm onMessageSubmit={ this.onMessageSubmit.bind(this) }/>
			</div>
		);
	}
}

export default chatBox;