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
				<CSSTransition
					key={message.id}
					timeout={600}
					classNames={{
						enter: 'b_chat__item--enter',
						enterActive: 'b_chat__item--enter_active'
					}}
				>
					<div className={this.getMessageClass(message)}>
						{ message.type !== 'NOTICE' ? <div className="b_chat__user">{ message.name }</div> : '' }
						<div className="b_chat__text">{ message.text }</div>
					</div>
				</CSSTransition>
			);
		});
	}

	getMessageClass(message) {
		return classNames('b_chat__item', {
			'b_chat__item--message': message.type === 'MESSAGE',
			'b_chat__item--notice': message.type === 'NOTICE',
			'b_chat__item--my': this.props.userID === message.userID
		});
	}

	render() {
		return (
			<div className="b_chat__scroll" ref={node => this.listNode = node}>
				<TransitionGroup className="b_chat__list">
					{ this.messageList }
				</TransitionGroup>
			</div>
		);
	}
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
