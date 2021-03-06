/* eslint-disable indent */
import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation, NavLink, Link } from 'react-router-dom';

import * as ROUTE from 'constants/routes';
import UserAvatar from 'views/account/components/UserAvatar';
import BasketToggle from '../basket/BasketToggle';
import Badge from './Badge';
import SearchBar from './SearchBar';
import FiltersToggle from './FiltersToggle';
import MobileNavigation from './MobileNavigation';

import logo from '../../../static/logo_horizontal.png';

const Navigation = ({ isAuth }) => {
	const navbar = useRef(null);
	const history = useHistory();
	const { pathname } = useLocation();
	// const scrollHandler = () => {
	// 	if (navbar.current && window.screen.width > 480) {
	// 		if (window.pageYOffset >= 70) {
	// 			navbar.current.classList.add('is-nav-scrolled');
	// 		} else {
	// 			navbar.current.classList.remove('is-nav-scrolled');
	// 		}
	// 	}
	// };

	// useEffect(() => {
	// 	window.addEventListener('scroll', scrollHandler);

	// 	return () => window.removeEventListener('scroll', scrollHandler);
	// }, []);

	const store = useSelector(state => ({
		filter: state.filter,
		products: state.products.items,
		basketLength: state.basket.length,
		profile: state.profile,
		isLoading: state.app.loading,
		isAuthenticating: state.app.isAuthenticating,
		productsLength: state.products.items.length
	}));

	const onClickLink = (e) => {
		if (store.isAuthenticating) e.preventDefault();
	};

	// disable the basket toggle to these pathnames
	const basketDisabledpathnames = [
		ROUTE.CHECKOUT_STEP_1,
		ROUTE.CHECKOUT_STEP_2,
		ROUTE.CHECKOUT_STEP_3,
		ROUTE.SIGNIN,
		ROUTE.SIGNUP,
		ROUTE.FORGOT_PASSWORD
	];

	return window.screen.width <= 800 ? (
		<MobileNavigation
			basketLength={store.basketLength}
			disabledpathnames={basketDisabledpathnames}
			isAuth={isAuth}
			isAuthenticating={store.isAuthenticating}
			pathname={pathname}
			profile={store.profile}
		/>
	) : (
			<nav
				className="top-bar"
				ref={navbar}
			>
				
				<ul className="navigation-menu">
					<li className="navigation-menu-item">
						<BasketToggle>
							{({ onClickToggle }) => (
								<button
									className="button-link navigation-menu-link basket-toggle"
									disabled={basketDisabledpathnames.includes(pathname)}
									onClick={onClickToggle}
								>

									<Badge count={store.basketLength}>
										<i className="fa fa-shopping-bag" style={{ fontSize: '2rem' }} />
									</Badge>
								</button>
							)}
						</BasketToggle>
					</li>
					{isAuth ? (
						<li className="navigation-menu-item">
							<UserAvatar isAuthenticating={store.isAuthenticating} profile={store.profile} />
						</li>
					) : (
							<li className="navigation-action">
								{pathname !== ROUTE.SIGNUP && (
									<NavLink
										activeClassName="navigation-menu-active"
										className="btn btn-lg btn-block btn-secondary margin-right-s"
										exact
										onClick={onClickLink}
										to={ROUTE.SIGNUP}
									>
										Registrarse
									</NavLink>
								)}
								{pathname !== ROUTE.SIGNIN && (
									<NavLink
										activeClassName="navigation-menu-active"
										className="btn btn-info btn-lg margin-right-s"
										exact
										onClick={onClickLink}
										to={ROUTE.SIGNIN}
									>
										Ingresar
									</NavLink>
								)}
							</li>
						)}
				</ul>
			</nav>
		);
};

export default Navigation;
