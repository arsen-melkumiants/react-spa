import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import marked from 'marked';

marked.setOptions({
	breaks: true
});

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class ChatList extends React.Component {

	componentDidUpdate() {
		var listDOM = ReactDOM.findDOMNode(this.refs.list);
		listDOM.scrollTop = listDOM.scrollHeight;
	}

	getMessageClass (message) {
		return classNames({
			'chat-message': true,
			'chat-message-my': this.props.userID === message.userID
		});
	}

	get messageList () {
		return this.props.messages.map(message => {
			if (message.type === 'MESSAGE') {
				return (
					<div className={ this.getMessageClass(message) } key={ message.id }>
						<div className="chat-message-user">
							{ message.name }
						</div>
						<div className="chat-message-text" dangerouslySetInnerHTML={{ __html: marked(message.text) }} />
					</div>
				);
			} else if (message.type === 'NOTICE') {
				return (
					<div className="chat-message-notice" key={ message.id }>
						<div className="chat-message-text" dangerouslySetInnerHTML={{ __html: marked(message.text) }} />
					</div>
				);
			}
		});
	}

	render () {
		return (
			<ReactCSSTransitionGroup
				ref="list"
				component="div"
				className="chat-list"
				transitionName="chat-message"
				transitionEnterTimeout={600}
				transitionLeaveTimeout={600}
			>
				{ this.messageList }
			</ReactCSSTransitionGroup>
		);
	}
}

ChatList.propTypes = {
	messages: React.PropTypes.array.isRequired,
	userID: React.PropTypes.string.isRequired
};

export default ChatList;