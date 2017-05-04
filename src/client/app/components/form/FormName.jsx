import React from 'react';
import classNames from 'classnames';

import 'form/less/form.less';

class FormName extends React.Component {
	constructor () {
		super();
		this.state = {
			name: '',
			btnStatus: false
		};
	}

	componentWillMount () {
		this.state.name = this.props.name || '';
	}

	onNameChange (e) {
		var newName = e.target.value.trim();
		this.setState({
			name: newName,
			btnStatus: Boolean(newName)
		});
	}

	onNameSubmit (e) {
		e.preventDefault();
		var name = this.state.name;
		if (!name || !this.state.btnStatus) {
			return;
		}

		this.props.onNameSubmit(name);
		this.setState({
			name: name,
			btnStatus: false
		});
	}

	get btnClass () {
		return classNames({
			'form-btn': true,
			'form-btn-profile': true,
			'form-btn-disabled': !this.state.btnStatus
		});
	}

	render () {
		return (
			<form className="form" onSubmit={ this.onNameSubmit.bind(this) }>
				<div className="form-text">
					<input
						type="text"
						ref="input"
						placeholder="Enter your name"
						value={ this.state.name }
						onChange={ this.onNameChange.bind(this) }
					/>
				</div>
				<button className={ this.btnClass }>
					<i className="material-icons">&#xE7FD;</i>
				</button>
			</form>
		);
	}
}

FormName.propTypes = {
	onNameSubmit: React.PropTypes.func.isRequired,
	name: React.PropTypes.string
};

export default FormName;
