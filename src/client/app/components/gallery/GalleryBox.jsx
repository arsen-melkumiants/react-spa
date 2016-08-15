import React from 'react';
import storage from 'storage';

import 'gallery/less/gallery.less';

import GalleryList from 'gallery/GalleryList';
import GalleryNav from 'gallery/GalleryNav';

class GalleryBox extends React.Component {
	constructor () {
		super();
		this.state = {
			width: storage.get('width'),
			height: storage.get('height'),
			images: [],
			active: 0
		};
	}

	get imageURL () {
		return 'http://lorempixel.com/' + this.state.width + '/' + this.state.height + '/?t=' + Date.now();
	}

	componentDidMount () {
		this.loadImage();
	}

	loadImage () {
		var images = this.state.images.concat([{
			id: this.state.active + 1,
			src: this.imageURL
		}]);

		this.setState({
			images: images,
			active: this.state.active + 1
		});
	}

	onChangeImage (type) {
		var active = this.state.active;
		var images = this.state.images;

		if (type === 'NEXT' && active < images.length) {
			this.setState({ active: active + 1 });
		} else if (type === 'PREV' && active > 1) {
			this.setState({ active: active - 1 });
		} else if (type === 'NEXT') {
			this.loadImage();
		}
	}


	render () {
		return (
			<div className="gallery-box block" style={{ maxWidth: this.state.width }}>
				<GalleryNav onChangeImage={ this.onChangeImage.bind(this) } />
				<GalleryList
					images={ this.state.images }
					active={ this.state.active }
				/>
			</div>
		);
	}
}

export default GalleryBox;