import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classNames from 'classnames';


class ChatList extends React.Component {
	componentDidUpdate() {
		// NOTE: Scroll down the chat list
		this.listNode.scrollTop = this.listNode.scrollHeight;
	}

	get messageList() {
		return this.props.messages.map((message) => {
			return (
				<CSSTransition key={message.id} timeout={600} classNames="chat-message">
					<div className={this.getMessageClass(message)}>
						{ message.type !== 'NOTICE' ? <div className="chat-message-user">{ message.name }</div> : ''}
						<div className="chat-message-text">{ message.text }</div>
					</div>
				</CSSTransition>
			);
		});
	}

	getMessageClass(message) {
		return classNames({
			'chat-message': message.type === 'MESSAGE',
			'chat-message-notice': message.type === 'NOTICE',
			'chat-message-my': this.props.userID === message.userID
		});
	}

	render() {
		return (
			<div className="chat-list" ref={node => this.listNode = node}>
				<TransitionGroup>
					{ this.messageList }
				</TransitionGroup>
			</div>
		);
	}

	// <ReactCSSTransitionGroup
	// 	ref="list"
	// 	component="div"
	// 	className="chat-list"
	// 	transitionName="chat-message"
	// 	transitionEnterTimeout={600}
	// 	transitionLeaveTimeout={600}
	// >
}

ChatList.propTypes = {
	messages: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		text: PropTypes.string,
		name: PropTypes.string,
		type: PropTypes.string
	})).isRequired,
	userID: PropTypes.string.isRequired
};

export default ChatList;
