import React from 'react';
import socket from 'socket';

import 'chat/less/chat.less';

import ChatList from 'chat/ChatList';
import ChatForm from 'chat/ChatForm';


class ChatBox extends React.Component {
	constructor() {
		super();

		this.state = {
			userID: socket.id || '',
			messages: []
		};

		this.showLastMessages = this.showLastMessages.bind(this);
		this.showNewMessage = this.showNewMessage.bind(this);
	}

	componentWillMount() {
		if (this.state.userID) {
			this.loadMessages();
			return;
		}

		socket.on('connect', () => {
			this.setState({ userID: socket.id });
			this.loadMessages();
		});
	}

	componentWillUnmount() {
		socket
			.off('new_message', this.showNewMessage)
			.off('last_messages', this.showLastMessages);
	}

	onMessageSubmit(message) {
		socket.emit('send_message', message);
	}

	loadMessages() {
		socket
			.on('last_messages', this.showLastMessages)
			.on('new_message', this.showNewMessage)
			.emit('last_messages');
	}

	showLastMessages(messageList) {
		this.setState({ messages: messageList });
	}

	showNewMessage(message) {
		this.setState({ messages: this.state.messages.concat([message]) });
	}

	render() {
		return (
			<div className="b_chat">
				<ChatList
					messages={this.state.messages}
					userID={this.state.userID}
				/>
				<ChatForm onMessageSubmit={this.onMessageSubmit} />
			</div>
		);
	}
}

export default ChatBox;
