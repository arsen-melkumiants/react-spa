import React from 'react';
import PropTypes from 'prop-types';
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
			return (<div className="nav-list-counter">{ this.state.count }</div>);
		}

		return null;
	}

	render() {
		return (
			<div>
				<div className="nav-box">
					<div className="nav-title">
						<h2 className="container">
							<span className="nav-title-long">Example of Single Page Application</span>
							<span className="nav-title-short">Example of SPA</span>
						</h2>
					</div>
					<ul className="nav-list block">
						<NavItem to="/" exact>Chat {this.counter}</NavItem>
						<NavItem to="/gallery">Gallery</NavItem>
						<NavItem to="/settings">Settings</NavItem>
					</ul>
				</div>
				<div className="content container">
					{ this.props.children }
				</div>
			</div>
		);
	}
}

NavBox.propTypes = {
	children: PropTypes.node
};

NavBox.defaultProps = {
	children: ''
};

export default NavBox;
