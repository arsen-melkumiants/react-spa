import React from 'react';
import PropTypes from 'prop-types';

import GalleryItem from 'gallery/GalleryItem';


function GalleryList({ images, active }) {
	const calculateOffset = () => {
		return -(active - 1) * 100;
	};

	const getTransformStyle = () => {
		return `translate3d(${calculateOffset()}%, 0px, 0px)`;
	};

	const getStatus = (image) => {
		return image.id === active;
	};

	return (
		<div className="b_gallery__list" style={{ transform: getTransformStyle() }}>
			{ images.map(image => (
				<GalleryItem image={image} active={getStatus(image)} key={image.id} />
			))}
		</div>
	);
}

GalleryList.propTypes = {
	active: PropTypes.number.isRequired,
	images: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		src: PropTypes.string.isRequired
	})).isRequired
};

export default GalleryList;
