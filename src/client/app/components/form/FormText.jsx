import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import 'form/less/form.less';

class FormText extends React.Component {
	constructor() {
		super();
		this.state = {
			text: '',
			btnStatus: false
		};

		this.onKeyDown = this.onKeyDown.bind(this);
		this.onTextSubmit = this.onTextSubmit.bind(this);
		this.onTextChange = this.onTextChange.bind(this);
	}

	componentDidMount() {
		this.textareaNode.focus();
	}

	onKeyDown(e) {
		if (e.ctrlKey && (e.keyCode === 10 || e.keyCode === 13)) {
			this.onTextSubmit(e);
		}
	}

	onTextChange(e) {
		this.setState({
			// NOTE: Do not trim on text because user can use line breaks
			text: e.target.value,
			btnStatus: e.target.value.trim()
		});
	}

	onTextSubmit(e) {
		e.preventDefault();
		let text = this.state.text.trim();
		if (!text) {
			return;
		}

		this.props.onTextSubmit(text);
		this.setState({
			text: '',
			btnStatus: false
		});
	}

	get btnClass() {
		return classNames({
			'form-btn': true,
			'form-btn-send': true,
			'form-btn-disabled': !this.state.btnStatus
		});
	}

	render() {
		return (
			<form className="form" onSubmit={this.onTextSubmit}>
				<div className="form-text">
					<div className="form-text-inner">
						<textarea
							ref={node => this.textareaNode = node}
							value={this.state.text}
							placeholder="Say something..."
							onKeyDown={this.onKeyDown}
							onChange={this.onTextChange}
						/>
					</div>
				</div>
				<button className={this.btnClass}>
					<i className="material-icons">&#xE163;</i>
				</button>
			</form>
		);
	}
}

FormText.propTypes = {
	onTextSubmit: PropTypes.func.isRequired
};

export default FormText;
