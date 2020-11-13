/* eslint-disable no-nested-ternary */
import React , {useState} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Basket from 'components/basket/Basket';
import Navigation from 'components/ui/Navigation';
import Footer from 'components/ui/Footer';
import Banner from 'components/ui/Banner';

import { SIGNIN, ADMIN_DASHBOARD } from 'constants/routes';
import Menu from 'components/ui/Menu';
import '../styles/style.scss';


const PrivateRoute = ({
	isAuth,
	userType,
	component: Component,
	path,
	...rest
}) => (
	
		<Route
			{...rest}
			component={props => (
				isAuth && userType === 'USER'
					? (
						<>
						<div className="header-main">
							<Navigation isAuth={isAuth} />
							<Basket isAuth={isAuth} />
							<Menu />
							</div>
							<Banner />
							<main className="content">
								<Component {...props} />
							</main>
							<Footer />
						</>
					)
					: isAuth && userType === 'ADMIN' ? <Redirect to={ADMIN_DASHBOARD} />
						: <Redirect to={{
							pathname: SIGNIN,
							state: { from: props.location }
						}}
						/>
			)}
		/>
	);

const mapStateToProps = ({ auth }) => ({
	isAuth: !!auth.id && !!auth.role,
	userType: auth.role
});



export default connect(mapStateToProps)(PrivateRoute);
