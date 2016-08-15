import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import 'form/less/form.less';

class FormRange extends React.Component {
	constructor (props) {
		super();
		this.state = {
			value: props.value
		};
	}

	componentDidMount () {
		this.forceUpdate();
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
						value={ this.state.value }
						max={ this.props.max }
						min={ this.props.min }
						onMouseUp={ this.onRangeChange.bind(this) }
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