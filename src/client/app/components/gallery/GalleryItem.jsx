import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import PreLoader from 'preloader/PreLoader';

class GalleryItem extends React.Component {
	constructor(props) {
		super();
		this.state = {
			image: Object.assign({}, props.image),
			loaded: false
		};

		this.onImageLoaded = this.onImageLoaded.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			image: Object.assign({}, nextProps.image)
		});
	}

	onImageLoaded() {
		this.setState({ loaded: true });
	}

	get itemClass() {
		return classNames('b_gallery__item', {
			'b_gallery__item--active': this.props.active === this.state.image.id
		});
	}

	get imageClass() {
		return classNames('b_gallery__image', {
			'b_gallery__image--loaded': this.state.loaded
		});
	}

	render() {
		return (
			<div className={this.itemClass}>
				<PreLoader show={!this.state.loaded} />
				<img
					alt=""
					className={this.imageClass}
					onLoad={this.onImageLoaded}
					src={this.state.image.src}
				/>
			</div>
		);
	}
}

GalleryItem.propTypes = {
	image: PropTypes.shape({
		id: PropTypes.number.isRequired,
		src: PropTypes.string.isRequired
	}).isRequired,
	active: PropTypes.bool.isRequired
};

export default GalleryItem;
