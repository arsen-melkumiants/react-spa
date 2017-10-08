import React from 'react';
import PropTypes from 'prop-types';
import storage from 'storage';

import FormName from 'form/FormName';
import FormText from 'form/FormText';


class ChatForm extends React.Component {
	constructor() {
		super();
		this.state = {
			name: storage.get('name')
		};

		this.onNameSubmit = this.onNameSubmit.bind(this);
		this.onMessageSubmit = this.onMessageSubmit.bind(this);
	}

	onNameSubmit(name) {
		this.setState({ name });
		storage.set('name', name);
	}

	onMessageSubmit(text) {
		this.props.onMessageSubmit({
			name: this.state.name,
			text
		});
	}

	get inputElements() {
		if (this.state.name) {
			return (<FormText onMessageSubmit={this.onMessageSubmit} />);
		}

		return (<FormName onNameSubmit={this.onNameSubmit} />);
	}

	render() {
		return (
			<div className="chat-form">
				{ this.inputElements }
			</div>
		);
	}
}

ChatForm.propTypes = {
	onMessageSubmit: PropTypes.func.isRequired
};

export default ChatForm;
