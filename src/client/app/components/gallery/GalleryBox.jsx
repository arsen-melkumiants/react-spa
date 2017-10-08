import React from 'react';
import storage from 'storage';

import 'gallery/less/gallery.less';

import GalleryList from 'gallery/GalleryList';
import GalleryNav from 'gallery/GalleryNav';

class GalleryBox extends React.Component {
	constructor() {
		super();
		this.state = {
			width: storage.get('width'),
			height: storage.get('height'),
			images: [],
			active: 0
		};

		this.onChangeImage = this.onChangeImage.bind(this);
	}

	componentDidMount() {
		this.loadImage();
	}

	onChangeImage(type) {
		let { active, images } = this.state;

		if (type === 'NEXT' && active < images.length) {
			this.setState({ active: active + 1 });
		} else if (type === 'PREV' && active > 1) {
			this.setState({ active: active - 1 });
		} else if (type === 'NEXT') {
			this.loadImage();
		}
	}

	get imageURL() {
		return `http://lorempixel.com/${this.state.width}/${this.state.height}/?t=${Date.now()}`;
	}

	loadImage() {
		let images = this.state.images.concat([{
			id: this.state.active + 1,
			src: this.imageURL
		}]);

		this.setState({
			images,
			active: this.state.active + 1
		});
	}

	render() {
		return (
			<div className="gallery-box block" style={{ maxWidth: this.state.width }}>
				<GalleryNav onChangeImage={this.onChangeImage} />
				<GalleryList
					images={this.state.images}
					active={this.state.active}
				/>
			</div>
		);
	}
}

export default GalleryBox;
