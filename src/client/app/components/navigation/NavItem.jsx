import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

function NavItem({ to, exact, children }) {
	return (
		<li className="nav-list-item">
			<NavLink
				exact={exact}
				to={to}
				className="nav-list-link"
				activeClassName="nav-list-link-active"
			>
				{ children }
			</NavLink>
		</li>
	);
}

NavItem.propTypes = {
	to: PropTypes.string.isRequired,
	exact: PropTypes.bool,
	children: PropTypes.node
};

NavItem.defaultProps = {
	exact: false,
	children: ''
};

export default NavItem;
