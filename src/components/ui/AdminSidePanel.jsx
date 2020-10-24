import React from 'react';
import { NavLink } from 'react-router-dom';
import { ADMIN_PRODUCTS, ADMIN_USERS, ADMIN_ORDERS } from 'constants/routes';

const SideNavigation = () => {
	return (
		<aside className="sidenavigation">
			<div className="sidenavigation-wrapper">
				<div className="sidenavigation-item">
					<NavLink
						activeClassName="sidenavigation-menu-active"
						className="sidenavigation-menu"
						to={ADMIN_PRODUCTS}
					>
						Productos
					</NavLink>
				</div>
				<div className="sidenavigation-item">
					<NavLink
						activeClassName="sidenavigation-menu-active"
						className="sidenavigation-menu"
						to={ADMIN_ORDERS}
					>
						Pedidos
					</NavLink>
				</div>
				<div className="sidenavigation-item">
					<NavLink
						activeClassName="sidenavigation-menu-active"
						className="sidenavigation-menu"
						to={ADMIN_USERS}
					>
						Usuarios
					</NavLink>
				</div>
			</div>
		</aside>
	);
};

export default SideNavigation;
