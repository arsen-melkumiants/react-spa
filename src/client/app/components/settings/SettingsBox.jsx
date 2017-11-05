import React from 'react';
import storage from 'storage';
import socket from 'socket';
import classNames from 'classnames';

import 'settings/less/settings.less';

import FormName from 'form/FormName';
import FormRange from 'form/FormRange';

class SettingsBox extends React.Component {
	constructor() {
		super();
		this.state = {
			width: storage.get('width'),
			height: storage.get('height'),
			name: storage.get('name'),
			selectedItem: 'PHOTO'
		};

		this.onAccordionSelect = this.onAccordionSelect.bind(this);
		this.onWidthChange = this.onWidthChange.bind(this);
		this.onHeightChange = this.onHeightChange.bind(this);
		this.onNameSubmit = this.onNameSubmit.bind(this);
	}

	onNameSubmit(name) {
		if (this.state.name) {
			socket.emit('change_name', {
				oldName: this.state.name,
				newName: name
			});
		}

		storage.set('name', name);
		this.setState({ name });
	}

	onWidthChange(value) {
		storage.set('width', value);
		this.setState({ width: value });
	}

	onHeightChange(value) {
		storage.set('height', value);
		this.setState({ height: value });
	}

	onAccordionSelect(item) {
		this.setState({
			selectedItem: item === this.state.selectedItem ? '' : item
		});
	}

	getItemClass(item) {
		return classNames({
			'settings-item': true,
			'settings-item-active': item === this.state.selectedItem
		});
	}

	render() {
		return (
			<div className="settings-box">
				<div className={this.getItemClass('PHOTO')}>
					<div
						tabIndex={0}
						role="button"
						className="settings-title"
						onClick={() => this.onAccordionSelect('PHOTO')}
						onKeyDown={() => this.onAccordionSelect('PHOTO')}
					>
						<i className="material-icons">&#xE315;</i>
						Photo settings
					</div>
					<div className="settings-body settings-body-photo">
						<FormRange
							min={300}
							max={500}
							value={this.state.width}
							label={`Width: ${this.state.width}px`}
							onRangeChange={this.onWidthChange}
						/>
						<FormRange
							min={200}
							max={500}
							value={this.state.height}
							label={`Height: ${this.state.height}px`}
							onRangeChange={this.onHeightChange}
						/>
					</div>
				</div>
				<div className={this.getItemClass('CHAT')}>
					<div
						tabIndex={0}
						role="button"
						className="settings-title"
						onClick={() => this.onAccordionSelect('CHAT')}
						onKeyDown={() => this.onAccordionSelect('CHAT')}
					>
						<i className="material-icons">&#xE315;</i>
						Chat settings
					</div>
					<div className="settings-body settings-body-chat">
						<FormName name={this.state.name} onNameSubmit={this.onNameSubmit} />
					</div>
				</div>
			</div>
		);
	}
}

export default SettingsBox;
