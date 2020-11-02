/* eslint-disable indent */
import { call, put, select, all } from 'redux-saga/effects';
import firebase from 'firebase/firebase';

import {
	GET_USERS
} from 'constants/constants';

import {
	getUsersSuccess
} from '../actions/userActions';

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

function* userSaga({ type, payload }) {
	switch (type) {
		case GET_USERS:
			try {
				yield initRequest();
				const state = yield select();
				const result = yield call(firebase.getUsers, payload);

				yield put(getUsersSuccess({
					users: result.users,
					lastKey: result.lastKey ? result.lastKey : state.users.lastRefKey,
					total: result.total ? result.total : state.users.total
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

export default userSaga;
