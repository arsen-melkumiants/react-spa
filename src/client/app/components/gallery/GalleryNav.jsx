import React from 'react';
import Swipeable from 'react-swipeable';

class GalleryNav extends React.Component {

	onNextSlide () {
		this.props.onChangeImage('NEXT');
	}

	onPrevSlide () {
		this.props.onChangeImage('PREV');
	}

	render () {
		return (
			<Swipeable
				className="gallery-nav"
				onSwipedLeft={ this.onNextSlide.bind(this) }
				onSwipedRight={ this.onPrevSlide.bind(this) }
			>
				<div
					className="gallery-next-area"
					onClick={ this.onNextSlide.bind(this) }
				>
					<div className="gallery-arrow">
						<i className="material-icons">&#xE315;</i>
					</div>
				</div>
				<div
					className="gallery-prev-area"
					onClick={ this.onPrevSlide.bind(this) }
				>
					<div className="gallery-arrow">
						<i className="material-icons">&#xE314;</i>
					</div>
				</div>
			</Swipeable>
		);
	}
}

GalleryNav.propTypes = {
	onChangeImage: React.PropTypes.func.isRequired
};

export default GalleryNav;