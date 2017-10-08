import React from 'react';
import PropTypes from 'prop-types';

import 'form/less/form.less';


class FormRange extends React.Component {
	constructor(props) {
		super();
		this.state = {
			value: props.value
		};

		this.onRangeChange = this.onRangeChange.bind(this);
	}

	componentDidMount() {
		this.forceUpdate();
	}

	onRangeChange(e) {
		this.props.onRangeChange(e.target.value);
		this.setState({
			value: e.target.value
		});
	}

	render() {
		return (
			<div className="form">
				<label className="form-label">{ this.props.label }</label>
				<div className="form-range">
					<input
						type="range"
						value={this.state.value}
						max={this.props.max}
						min={this.props.min}
						onMouseUp={this.onRangeChange}
						onChange={this.onRangeChange}
					/>
				</div>
			</div>
		);
	}
}

FormRange.propTypes = {
	onRangeChange: PropTypes.func.isRequired,
	max: PropTypes.number.isRequired,
	min: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
	label: PropTypes.string.isRequired
};

export default FormRange;
