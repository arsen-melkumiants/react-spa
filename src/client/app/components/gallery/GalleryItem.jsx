import React from 'react';
import classNames from 'classnames';

import PreLoaderSpinner from 'preloader/PreLoaderSpinner';

class GalleryItem extends React.Component {
	constructor (props) {
		super();
		this.state = {
			image: Object.assign({}, props.image),
			active: props.active,
			loaded: false
		};
	}

	componentWillReceiveProps (nextProps) {
		this.setState({
			image: Object.assign({}, nextProps.image),
			active: this.props.active
		});
	}

	onImageLoad () {
		this.setState({loaded: true});
	}

	get itemClass () {
		return classNames({
			'gallery-item': true,
			'gallery-item-active': this.props.active === this.state.image.id
		});
	}

	get imageClass () {
		return classNames({
			'gallery-image': true,
			'gallery-image-loaded': this.state.loaded
		});
	}

	render () {
		return (
			<div className={ this.itemClass }>
				<PreLoaderSpinner show={ !this.state.loaded } />
				<img
					className={ this.imageClass }
					onLoad={ this.onImageLoad.bind(this) }
					src={ this.state.image.src }
				/>
			</div>
		);
	}
}

GalleryItem.propTypes = {
	image: React.PropTypes.object.isRequired,
	active: React.PropTypes.bool.isRequired
};

export default GalleryItem;