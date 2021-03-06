import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import * as ROUTES from 'constants/routes';

import Dashboard from 'views/admin/dashboard';
import Products from 'views/admin/products';
import EditProduct from 'views/admin/edit_product';
import AddProduct from 'views/admin/add_product';

import Orders from 'views/admin/orders';
import EditOrder from 'views/admin/edit_order';

import Users from 'views/admin/users';
import EditUser from 'views/admin/edit_user'

import Categories from 'views/admin/categories';
import EditCategory from 'views/admin/edit_category'
import AddCategory from 'views/admin/add_category'

import Brands from 'views/admin/brands';
import EditBrand from 'views/admin/edit_brand'
import AddBrand from 'views/admin/add_brand'

import ViewProduct from 'views/view_product';

import ProductSearch from 'components/product/ProductSearch';
import SignUp from 'views/auth/signup';
import SignIn from 'views/auth/signin';
import ForgotPassword from 'views/auth/forgot_password';
import UserAccount from 'views/account/user_account';
import EditAccount from 'views/account/edit_account';
import Home from 'views/home';
import Home2 from 'views/home2';
import Product from 'views/products';
import ProductByCategory from 'views/products';
import Category from 'views/category';
import Sale from 'views/sale';
import About from 'views/about';
import Contact from 'views/contact';
import CheckOutStep1 from 'views/checkout/step1';
import CheckOutStep2 from 'views/checkout/step2';
import CheckOutStep3 from 'views/checkout/step3';
import CheckOutFinal from 'views/checkout/stepfinal';
import PageNotFound from 'views/error/PageNotFound';

import ClientRoute from './ClientRoute';
import PublicRoute from './PublicRoute';
import AdminRoute from './AdminRoute';

export const history = createBrowserHistory();

const AppRouter = () => (
	<Router history={history}>
		<Switch>
			<Route
				component={ProductSearch}
				exact
				path={ROUTES.SEARCH}
			/>
			<PublicRoute
				component={Home}
				exact
				path={ROUTES.HOME}
			/>
			<PublicRoute
				component={Home2}
				exact
				path={ROUTES.HOME2}
			/>
			<PublicRoute
				component={Category}
				exact
				path={ROUTES.CATEGORY}
			/>
			<PublicRoute
				component={Product}
				exact
				path={ROUTES.PRODUCT}
			/>
			<PublicRoute
				component={ProductByCategory}
				path={`${ROUTES.PRODUCTS_BY_CATEGORY}`}
			/>
			<PublicRoute
				component={Sale}
				exact
				path={ROUTES.SALE}
			/>
			<PublicRoute
				component={About}
				exact
				path={ROUTES.ABOUT}
			/>
			<PublicRoute
				component={Contact}
				exact
				path={ROUTES.CONTACT}
			/>
			<PublicRoute
				component={SignUp}
				path={ROUTES.SIGNUP}
			/>
			<PublicRoute
				component={SignIn}
				exact
				path={ROUTES.SIGNIN}
			/>
			<PublicRoute
				component={ForgotPassword}
				path={ROUTES.FORGOT_PASSWORD}
			/>
			<PublicRoute
				component={ViewProduct}
				path={ROUTES.VIEW_PRODUCT}
			/>
			<ClientRoute
				component={UserAccount}
				exact
				path={ROUTES.ACCOUNT}
			/>
			<ClientRoute
				component={EditAccount}
				exact
				path={ROUTES.ACCOUNT_EDIT}
			/>
			<ClientRoute
				component={CheckOutStep1}
				path={ROUTES.CHECKOUT_STEP_1}
			/>
			<ClientRoute
				component={CheckOutStep2}
				path={ROUTES.CHECKOUT_STEP_2}
			/>
			<ClientRoute
				component={CheckOutStep3}
				path={ROUTES.CHECKOUT_STEP_3}
			/>
			<ClientRoute
				component={CheckOutFinal}
				path={ROUTES.CHECKOUT_FINAL}
			/>
			<AdminRoute
				component={Dashboard}
				exact
				path={ROUTES.ADMIN_DASHBOARD}
			/>
			<AdminRoute
				component={Products}
				path={ROUTES.ADMIN_PRODUCTS}
			/>
			<AdminRoute
				component={AddProduct}
				path={ROUTES.ADD_PRODUCT}
			/>
			<AdminRoute
				component={EditProduct}
				path={`${ROUTES.EDIT_PRODUCT}/:id`}
			/>
			<AdminRoute
				component={Orders}
				path={ROUTES.ADMIN_ORDERS}
			/>
			<AdminRoute
				component={EditOrder}
				path={`${ROUTES.EDIT_ORDER}/:id`}
			/>
			<AdminRoute
				component={Users}
				path={ROUTES.ADMIN_USERS}
			/>
			<AdminRoute
				component={EditUser}
				path={`${ROUTES.EDIT_USER}/:id`}
			/>
			<AdminRoute
				component={Categories}
				path={ROUTES.ADMIN_CATEGORIES}
			/>
			<AdminRoute
				component={EditCategory}
				path={`${ROUTES.EDIT_CATEGORY}/:id`}
			/>
			<AdminRoute
				component={AddCategory}
				path={`${ROUTES.ADD_CATEGORY}`}
			/>
			<AdminRoute
				component={Brands}
				path={ROUTES.ADMIN_BRANDS}
			/>
			<AdminRoute
				component={EditBrand}
				path={`${ROUTES.EDIT_BRAND}/:id`}
			/>
			<AdminRoute
				component={AddBrand}
				path={`${ROUTES.ADD_BRAND}`}
			/>
			<PublicRoute component={PageNotFound} />
		</Switch>
	</Router>
);

export default AppRouter;
