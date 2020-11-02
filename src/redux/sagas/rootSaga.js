import { takeLatest } from 'redux-saga/effects';
import * as ACTION from 'constants/constants';
import authSaga from './authSaga';
import productSaga from './productSaga';
import profileSaga from './profileSaga';
import orderSaga from './orderSaga';
import userSaga from './userSaga';
import brandSaga from './brandSaga';
import categorySaga from './categorySaga';

function* rootSaga() {
	yield takeLatest([
		ACTION.SIGNIN,
		ACTION.SIGNUP,
		ACTION.SIGNOUT,
		ACTION.SIGNIN_WITH_GOOGLE,
		ACTION.SIGNIN_WITH_FACEBOOK,
		ACTION.SIGNIN_WITH_GITHUB,
		ACTION.ON_AUTHSTATE_CHANGED,
		ACTION.ON_AUTHSTATE_SUCCESS,
		ACTION.ON_AUTHSTATE_FAIL,
		ACTION.SET_AUTH_PERSISTENCE,
		ACTION.RESET_PASSWORD
	], authSaga);
	yield takeLatest([
		ACTION.ADD_PRODUCT,
		ACTION.REMOVE_PRODUCT,
		ACTION.EDIT_PRODUCT,
		ACTION.GET_PRODUCTS
	], productSaga);
	yield takeLatest([
		ACTION.UPDATE_EMAIL,
		ACTION.UPDATE_PROFILE
	], profileSaga);
	yield takeLatest([
		ACTION.ADD_ORDER,
		ACTION.EDIT_ORDER,
		ACTION.GET_ORDERS
	], orderSaga);
	yield takeLatest([
		ACTION.GET_USERS
	], userSaga);
	yield takeLatest([
		ACTION.ADD_BRAND,
		ACTION.EDIT_BRAND,
		ACTION.REMOVE_BRAND,
		ACTION.GET_BRANDS
	], brandSaga);
	yield takeLatest([
		ACTION.ADD_CATEGORY,
		ACTION.EDIT_CATEGORY,
		ACTION.REMOVE_CATEGORY,
		ACTION.GET_CATEGORIES
	], categorySaga);
}

export default rootSaga;
