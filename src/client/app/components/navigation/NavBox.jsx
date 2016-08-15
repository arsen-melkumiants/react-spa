import React from 'react';
import socket from 'socket';

import 'navigation/less/navigation.less';

import NavItem from 'navigation/NavItem';

class NavBox extends React.Component {
	constructor () {
		super();
		this.state = {
			count: 0
		};

		socket.on('new_message', message => {
			if (window.location.pathname !== '/' && message.type === 'MESSAGE') {
				this.setState({ count: this.state.count + 1 });
			}
		});
	}

	componentWillReceiveProps () {
		if (window.location.pathname === '/' && this.state.count) {
			this.setState({ count: 0 });
		}
	}

	get counter () {
		if (this.state.count) {
			return (<div className="nav-list-counter">{ this.state.count }</div>);
		}
	}

	render () {
		return (
			<div>
				<div className="nav-box">
					<div className="nav-title">
						<h2 className="container">
							<span className="nav-title-long">Example of Single Page Application</span>
							<span className="nav-title-short">Example of SPA</span>
						</h2>
					</div>
					<ul className="nav-list block" role="nav">
						<li className="nav-list-item"><NavItem to="/" isIndexLink={true}>Chat { this.counter }</NavItem></li>
						<li className="nav-list-item"><NavItem to="/gallery">Gallery</NavItem></li>
						<li className="nav-list-item"><NavItem to="/settings">Settings</NavItem></li>
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
	children: React.PropTypes.element
};

export default NavBox;