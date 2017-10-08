import React from 'react';
import PropTypes from 'prop-types';
import Swipeable from 'react-swipeable';


function GalleryNav({ onChangeImage }) {
	const onNextSlide = () => {
		onChangeImage('NEXT');
	};

	const onPrevSlide = () => {
		onChangeImage('PREV');
	};

	const onKeySlide = (e) => {
		if (e.key === 'ArrowRight') {
			onChangeImage('NEXT');
		} else if (e.key === 'ArrowLeft') {
			onChangeImage('PREV');
		}
	};

	return (
		<Swipeable
			tabIndex={0}
			className="gallery-nav"
			onSwipedLeft={onNextSlide}
			onSwipedRight={onPrevSlide}
			onKeyDown={onKeySlide}
		>
			<div
				role="presentation"
				className="gallery-next-area"
				onClick={onNextSlide}
				onKeyDown={onNextSlide}
			>
				<div className="gallery-arrow">
					<i className="material-icons">&#xE315;</i>
				</div>
			</div>
			<div
				role="presentation"
				className="gallery-prev-area"
				onClick={onPrevSlide}
				onKeyDown={onPrevSlide}
			>
				<div className="gallery-arrow">
					<i className="material-icons">&#xE314;</i>
				</div>
			</div>
		</Swipeable>
	);
}

GalleryNav.propTypes = {
	onChangeImage: PropTypes.func.isRequired
};

export default GalleryNav;
