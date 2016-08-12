import React from 'react';

import 'preloader/less/preloader.less';

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class PreLoaderSpinner extends React.Component {

	get spinner () {
		if (this.props.show) {
			return (
				<div className="preloader-spinner">
					<svg className="preloader-spinner-svg" width={65} height={65} viewBox="0 0 66 66">
						<circle
							className="preloader-spinner-circle"
							cx={33}
							cy={33}
							r={30}
							strokeWidth={5}
							strokeLinecap="round"
						/>
					</svg>
				</div>
			);
		}
	}

	render() {
		return (
			<ReactCSSTransitionGroup
				transitionName="preloader-spinner"
				transitionAppear={true}
				transitionAppearTimeout={300}
				transitionEnterTimeout={300}
				transitionLeaveTimeout={300}
			>
					{ this.spinner }
			</ReactCSSTransitionGroup>
		)
	}
}

PreLoaderSpinner.propTypes = {
	show: React.PropTypes.bool.isRequired
};

export default PreLoaderSpinner;