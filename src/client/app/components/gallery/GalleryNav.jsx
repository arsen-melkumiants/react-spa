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
			className="b_gallery__navigation"
			onSwipedLeft={onNextSlide}
			onSwipedRight={onPrevSlide}
			onKeyDown={onKeySlide}
		>
			<div
				role="presentation"
				className="b_gallery__prev_area"
				onClick={onPrevSlide}
				onKeyDown={onPrevSlide}
			>

				<i className="b_gallery__arrow_icon material-icons">&#xE314;</i>

			</div>
			<div
				role="presentation"
				className="b_gallery__next_area"
				onClick={onNextSlide}
				onKeyDown={onNextSlide}
			>

				<i className="b_gallery__arrow_icon material-icons">&#xE315;</i>

			</div>
		</Swipeable>
	);
}

GalleryNav.propTypes = {
	onChangeImage: PropTypes.func.isRequired
};

export default GalleryNav;
