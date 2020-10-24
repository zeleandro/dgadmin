/* eslint-disable indent */
import { call, put, select, all } from 'redux-saga/effects';
import firebase from 'firebase/firebase';

import {
	LOADING,
	SET_REQUEST_STATUS,
	ADD_ORDER,
	GET_ORDER,
	GET_ORDERS
} from 'constants/constants';

import {
	addOrderSuccess,
	getOrderSuccess,
	getOrdersSuccess
} from '../actions/orderActions';
import { setLoading, setRequestStatus } from 'redux/actions/miscActions'

import { displayActionMessage } from 'helpers/utils';
import { history } from 'routers/AppRouter';

function* initRequest() {
	yield put(setLoading(true));
	yield put(setRequestStatus(null));
}

function* handleError(e) {
	yield put(setLoading(false));
	yield put(setRequestStatus(e));
	console.log('ERROR: ', e);
}

function* handleAction(location, message, status) {
	if (location) yield call(history.push, location);
	yield call(displayActionMessage, message, status);
}

function* orderSaga({ type, payload }) {
	switch (type) {
		case ADD_ORDER:
			try {
				yield initRequest();

				const key = yield call(firebase.generateKey);

				const order = {
					...payload
				};

				yield call(firebase.addOrder, key, order);
				yield put(addOrderSuccess({
					id: key,
					...order
				}));
				// yield handleAction(ADMIN_ORDERS, 'Order succesfully added', 'success');
				yield put(setLoading(false));
			} catch (e) {
				yield handleError(e);
				yield handleAction(undefined, `Item failed to add: ${e.message_}`, 'error');
			}
			break;
		case GET_ORDERS:
			try {
				yield initRequest();
				const state = yield select();
				const result = yield call(firebase.getOrders, payload);

				yield put(getOrdersSuccess({
					orders: result.orders,
					lastKey: result.lastKey ? result.lastKey : state.orders.lastRefKey,
					total: result.total ? result.total : state.orders.total
				}));
				// yield put({ type: SET_LAST_REF_KEY, payload: result.lastKey });
				yield put(setLoading(false));
			} catch (e) {
				yield handleError(e);
			}
			break;
		default:
			throw new Error(`Unexpected action type ${type}`);
	}
}

export default orderSaga;
