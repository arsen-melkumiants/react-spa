import React from 'react';
import PropTypes from 'prop-types';

import 'form/less/form.less';

function FormRange({ label, value, max, min, onRangeChange }) {
	console.log(onRangeChange);

	const onChange = (e) => {
		let value = Number(e.target.value);
		console.log(typeof value);
		onRangeChange(value);
	};

	return (
		<div className="form">
			<label className="form-label">{ label }</label>
			<div className="form-range">
				<input
					type="range"
					max={max}
					min={min}
					value={value}
					onMouseUp={onChange}
					onChange={onChange}
				/>
			</div>
		</div>
	);
}


FormRange.propTypes = {
	onRangeChange: PropTypes.func.isRequired,
	max: PropTypes.number.isRequired,
	min: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
	label: PropTypes.string.isRequired
};

export default FormRange;
