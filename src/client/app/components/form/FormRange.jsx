import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import 'form/less/form.less';

class FormRange extends React.Component {
	constructor () {
		super();
		this.state = {
			value: ''
		};
	}

	onRangeChange (e) {
		this.props.onRangeChange(e.target.value);
		this.setState({
			value: e.target.value
		});
	}

	render () {
		return (
			<div className="form">
				<label className="form-label">{ this.props.label }</label>
				<div className="form-range">
					<input
						type="range"
						placeholder="Enter your name"
						value={ this.props.value }
						max={ this.props.max }
						min={ this.props.min }
						onChange={ this.onRangeChange.bind(this) }
					/>
				</div>
			</div>
		);
	}
}

FormRange.propTypes = {
	onRangeChange: React.PropTypes.func.isRequired,
	max: React.PropTypes.number.isRequired,
	min: React.PropTypes.number.isRequired,
	value: React.PropTypes.number,
	label: React.PropTypes.string,
};

export default FormRange;