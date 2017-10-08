import React from 'react';
import PropTypes from 'prop-types';

import 'preloader/less/preloader.less';


function PreLoaderSpinner({ show }) {
	if (show) {
		return (
			<div className="preloader-spinner">
				<div className="preloader-spinner-container">
					<div className="preloader-spinner-layer">
						<div className="preloader-spinner-clipper preloader-spinner-clipper-left">
							<div className="preloader-spinner-circle preloader-spinner-circle-left" />
						</div>
						<div className="preloader-spinner-gap">
							<div className="preloader-spinner-circle preloader-spinner-circle-gap" />
						</div>
						<div className="preloader-spinner-clipper preloader-spinner-clipper-right">
							<div className="preloader-spinner-circle preloader-spinner-circle-right" />
						</div>
					</div>
				</div>
			</div>
		);
	}

	return null;
}

PreLoaderSpinner.propTypes = {
	show: PropTypes.bool.isRequired
};

export default PreLoaderSpinner;
