import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import 'form/less/form.less';

class FormText extends React.Component {
	constructor () {
		super();
		this.state = {
			text: '',
			btnStatus: false
		};
	}

	componentDidMount () {
		ReactDOM.findDOMNode(this.refs.input).focus();
	}

	onKeyDown (e) {
		if (e.ctrlKey && (e.keyCode === 10 || e.keyCode === 13)) {
			this.onMessageSubmit(e);
		}
	}

	onMessageChange (e) {
		this.setState({
			text: e.target.value, //do not trim onChange because user can use line breaks
			btnStatus: e.target.value.trim()
		});
	}

	onMessageSubmit (e) {
		e.preventDefault();
		var text = this.state.text.trim();
		if (!text) {
			return;
		}

		this.props.onMessageSubmit(text);
		this.setState({
			text: '',
			btnStatus: false
		});
	}

	get btnClass () {
		return classNames({
			'form-btn': true,
			'form-btn-send': true,
			'form-btn-disabled': !this.state.btnStatus
		});
	}

	render () {
		return (
			<form className="form" onSubmit={ this.onMessageSubmit.bind(this) }>
				<div className="form-text">
					<div className="form-text-inner">
						<textarea
							ref="input"
							value={ this.state.text }
							placeholder="Say something..."
							onKeyDown={ this.onKeyDown.bind(this) }
							onChange={ this.onMessageChange.bind(this) }
						/>
					</div>
				</div>
				<button className={ this.btnClass }>
					<i className="material-icons">&#xE163;</i>
				</button>
			</form>
		);
	}
}

FormText.propTypes = {
	onMessageSubmit: React.PropTypes.func.isRequired
};

export default FormText;