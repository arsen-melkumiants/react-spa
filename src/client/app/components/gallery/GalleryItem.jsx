import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import PreLoaderSpinner from 'preloader/PreLoaderSpinner';

class GalleryItem extends React.Component {
	constructor(props) {
		super();
		this.state = {
			image: Object.assign({}, props.image),
			loaded: false
		};

		this.onImageLoad = this.onImageLoad.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			image: Object.assign({}, nextProps.image)
		});
	}

	onImageLoad() {
		this.setState({ loaded: true });
	}

	get itemClass() {
		return classNames({
			'gallery-item': true,
			'gallery-item-active': this.props.active === this.state.image.id
		});
	}

	get imageClass() {
		return classNames({
			'gallery-image': true,
			'gallery-image-loaded': this.state.loaded
		});
	}

	render() {
		return (
			<div className={this.itemClass}>
				<PreLoaderSpinner show={!this.state.loaded} />
				<img
					alt=""
					className={this.imageClass}
					onLoad={this.onImageLoad}
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
