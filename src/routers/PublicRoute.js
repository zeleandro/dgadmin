/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React, { Fragment, useEffect, useRef, useState, Suspense } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { SIGNIN, SIGNUP, ADMIN_DASHBOARD } from 'constants/routes';

import Basket from 'components/basket/Basket';
import Navigation from 'components/ui/Navigation';
import Footer from 'components/ui/Footer';
import Banner from 'components/ui/Banner';
import Menu from 'components/ui/Menu';
import '../styles/style.scss';
const PublicRoute = ({
	userType,
	isAuth,
	component: Component,
	path,
	...rest
}) => (
		<Route
			{...rest}
			component={(props) => {
				const { from } = props.location.state || { from: { pathname: '/' } };
				const [isSticky, setSticky] = useState(false);
				const ref = useRef(null);
				const handleScroll = () => {
					if (ref.current) {
					setSticky(ref.current.getBoundingClientRect().top <= 0);
					}
				};

				useEffect(() => {
					window.addEventListener('scroll', handleScroll);

					return () => {
					window.removeEventListener('scroll', () => handleScroll);
					};
				}, []);
				return (
					isAuth && userType === 'ADMIN'
						? (
							<Redirect to={ADMIN_DASHBOARD} />
						)
						: (isAuth && userType === 'USER') && (path === SIGNIN || path === SIGNUP)
							? (
								<Redirect to={from} />
							)
							: (
								<>
									<Navigation isAuth={isAuth} />
									<Basket isAuth={isAuth} />
									<div className={`sticky-wrapper${isSticky ? ' is-sticky' : ''}`} ref={ref}>
										<Menu estilo={`${isSticky ? ' stiki' : ''}`} movil={`${isSticky ? ' sticky-pin' : ''}`}/>
									</div>
									<Banner />
									<main className="content">
										<Component {...props} />
									</main>
									<Footer />
								</>
							)
				);
			}}
		/>
	);

const mapStateToProps = ({ auth }) => ({
	isAuth: !!auth.id && !!auth.role,
	userType: auth.role
});

export default connect(mapStateToProps)(PublicRoute);
