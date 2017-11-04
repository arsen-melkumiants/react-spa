import React from 'react';
import socket from 'socket';

import 'navigation/less/navigation.less';

import NavItem from 'navigation/NavItem';


class NavBox extends React.Component {
	constructor() {
		super();
		this.state = {
			count: 0
		};

		socket.on('new_message', (message) => {
			if (!this.isChatPage && message.type === 'MESSAGE') {
				this.setState({ count: this.state.count + 1 });
			}
		});
	}

	get isChatPage() {
		return window.location.pathname === '/';
	}

	get counter() {
		if (this.isChatPage && this.state.count) {
			this.state.count = 0;
		}

		if (this.state.count) {
			return (<div className="b_navigation__counter">{ this.state.count }</div>);
		}

		return null;
	}

	render() {
		return (
			<div className="b_navigation">
				<h1 className="b_navigation__header">
					<span className="b_navigation__title--long">Example of Single Page Application</span>
					<span className="b_navigation__title--short">Example of SPA</span>
				</h1>
				<ul className="b_navigation__list">
					<NavItem to="/" exact>Chat {this.counter}</NavItem>
					<NavItem to="/gallery">Gallery</NavItem>
					<NavItem to="/settings">Settings</NavItem>
				</ul>
			</div>
		);
	}
}

export default NavBox;
