import React from 'react';

import GalleryItem from 'gallery/GalleryItem';

class GalleryList extends React.Component {

	getStatus (image) {
		return image.id === this.props.active;
	}

	calculateOffset () {
		return -(this.props.active - 1) * 100;
	}

	get transformStyle () {
		return 'translate3d(' + this.calculateOffset() + '%, 0px, 0px)';
	}

	get galleryList () {
		return this.props.images.map(image => {
			return (
				<GalleryItem image={ image } active={ this.getStatus(image) } key={ image.id }/>
			);
		});
	}

	render () {
		return (
			<div className="gallery-list" style={{ transform: this.transformStyle }}>
				{ this.galleryList }
			</div>
		);
	}
}

GalleryList.propTypes = {
	images: React.PropTypes.array.isRequired,
	active: React.PropTypes.number.isRequired
};

export default GalleryList;