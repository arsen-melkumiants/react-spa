import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import 'form/less/form.less';

class FormName extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			btnStatus: false
		};

		this.onNameChange = this.onNameChange.bind(this);
		this.onNameSubmit = this.onNameSubmit.bind(this);
	}

	componentWillMount() {
		this.state.name = this.props.name || '';
	}

	onNameChange(e) {
		let newName = e.target.value.trim();
		this.setState({
			name: newName,
			btnStatus: Boolean(newName)
		});
	}

	onNameSubmit(e) {
		e.preventDefault();
		let { name } = this.state;

		if (!name || !this.state.btnStatus) {
			return;
		}

		this.props.onNameSubmit(name);
		this.setState({
			name,
			btnStatus: false
		});
	}

	get btnClass() {
		return classNames({
			'form-btn': true,
			'form-btn-profile': true,
			'form-btn-disabled': !this.state.btnStatus
		});
	}

	render() {
		return (
			<form className="form" onSubmit={this.onNameSubmit}>
				<div className="form-text">
					<input
						type="text"
						placeholder="Enter your name"
						value={this.state.name}
						onChange={this.onNameChange}
					/>
				</div>
				<button className={this.btnClass}>
					<i className="material-icons">&#xE7FD;</i>
				</button>
			</form>
		);
	}
}

FormName.propTypes = {
	onNameSubmit: PropTypes.func.isRequired,
	name: PropTypes.string
};

FormName.defaultProps = {
	name: ''
};

export default FormName;
