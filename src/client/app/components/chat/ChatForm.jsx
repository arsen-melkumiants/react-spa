import React from 'react';
import classNames from 'classnames';
import storage from 'storage';

import FormName from 'form/FormName';
import FormText from 'form/FormText';


class ChatForm extends React.Component {
	constructor () {
		super();
		this.state = {
			name: storage.get('name'),
			text: ''
		};
	}

	onNameSubmit (name) {
		this.setState({ name: name });
		storage.set('name', name);
	}

	onMessageSubmit (text) {
		this.setState({ text: '' });
		this.props.onMessageSubmit({
			name: this.state.name,
			text: text
		});
	}

	get inputElements () {
		if (this.state.name) {
			return (<FormText onMessageSubmit={ this.onMessageSubmit.bind(this) }/>)
		} else {
			return (<FormName onNameSubmit={ this.onNameSubmit.bind(this) }/>);
		}
	}

	render () {
		return (
			<div className="chat-form">
				{ this.inputElements }
			</div>
		);
	}
}

ChatForm.propTypes = {
	onMessageSubmit: React.PropTypes.func.isRequired
};

export default ChatForm;