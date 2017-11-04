import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

function NavItem({ to, exact, children }) {
	return (
		<li className="b_navigation__item">
			<NavLink
				exact={exact}
				to={to}
				className="b_navigation__link"
				activeClassName="b_navigation__link--active"
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
