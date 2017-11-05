import React from 'react';
import PropTypes from 'prop-types';

import 'preloader/less/preloader.less';


function PreLoader({ show }) {
	if (show) {
		return (
			<div className="b_preloader">
				<div className="b_preloader__container">
					<div className="b_preloader__layer">
						<div className="b_preloader__clipper b_preloader__clipper--left">
							<div className="b_preloader__circle b_preloader__circle--left" />
						</div>
						<div className="b_preloader__gap ">
							<div className="b_preloader__circle b_preloader__circle--gap" />
						</div>
						<div className="b_preloader__clipper b_preloader__clipper--right">
							<div className="b_preloader__circle b_preloader__circle--right" />
						</div>
					</div>
				</div>
			</div>
		);
	}

	return null;
}

PreLoader.propTypes = {
	show: PropTypes.bool.isRequired
};

export default PreLoader;
