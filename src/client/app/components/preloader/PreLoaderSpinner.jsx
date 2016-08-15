import React from 'react';

import 'preloader/less/preloader.less';

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class PreLoaderSpinner extends React.Component {

	get spinner () {
		if (this.props.show) {
			return (
				<div className="preloader-spinner">
					<div className="preloader-spinner-container">
						<div className="preloader-spinner-layer">
							<div className="preloader-spinner-clipper preloader-spinner-clipper-left">
								<div className="preloader-spinner-circle preloader-spinner-circle-left"/>
							</div>
							<div className="preloader-spinner-gap">
								<div className="preloader-spinner-circle preloader-spinner-circle-gap"/>
							</div>
							<div className="preloader-spinner-clipper preloader-spinner-clipper-right">
								<div className="preloader-spinner-circle preloader-spinner-circle-right"/>
							</div>
						</div>
					</div>
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