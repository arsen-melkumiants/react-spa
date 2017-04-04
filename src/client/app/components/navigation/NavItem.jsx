import React from 'react';
import { NavLink } from 'react-router-dom';

class NavItem extends React.Component {
	render () {
		var linkProps = Object.assign({}, this.props);
  		delete linkProps.isIndexLink;

		if (this.props.isIndexLink) {
			return (<NavLink {...linkProps} className="nav-list-link" activeClassName="nav-list-link-active" />);
		} else {
			return (<NavLink {...linkProps} className="nav-list-link" activeClassName="nav-list-link-active" />);
		}
	}
}

NavItem.propTypes = {
	to: React.PropTypes.string.isRequired,
	isIndexLink: React.PropTypes.bool
};

export default NavItem;
