/* eslint-disable indent */
import { call, put, select, all } from 'redux-saga/effects';
import firebase from 'firebase/firebase';

import {
    LOADING,
    SET_REQUEST_STATUS,
    GET_BRANDS,
    ADD_BRAND,
    EDIT_BRAND,
    REMOVE_BRAND
} from 'constants/constants';

import {
    getBrandsSuccess,
    addBrandSuccess,
    editBrandSuccess,
    removeBrandSuccess
} from '../actions/brandActions';
import { setLoading, setRequestStatus } from 'redux/actions/miscActions'

import { displayActionMessage } from 'helpers/utils';
import { history } from 'routers/AppRouter';
import { ADMIN_BRANDS } from 'constants/routes';

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

function* brandSaga({ type, payload }) {
    switch (type) {
        case GET_BRANDS:
            try {
                yield initRequest();
                const state = yield select();
                const result = yield call(firebase.getBrands, payload);

                yield put(getBrandsSuccess({
                    brands: result.brands,
                    lastKey: result.lastKey ? result.lastKey : state.brands.lastRefKey,
                    total: result.total ? result.total : state.brands.total
                }));
                // yield put({ type: SET_LAST_REF_KEY, payload: result.lastKey });
                yield put(setLoading(false));
            } catch (e) {
                yield handleError(e);
            }
            break;
        case ADD_BRAND:
            try {
                yield initRequest();

                const key = yield call(firebase.generateBrandKey);

                const brand = {
                    ...payload
                };

                yield call(firebase.addBrand, key, brand);
                yield put(addBrandSuccess({
                    id: key,
                    ...brand
                }));
                yield handleAction(ADMIN_BRANDS, 'Item succesfully added', 'success');
                yield put(setLoading(false));
            } catch (e) {
                yield handleError(e);
                yield handleAction(undefined, `Item failed to add: ${e.message_}`, 'error');
            }
            break;
        case EDIT_BRAND:
            try {
                yield initRequest();

                let newUpdates = { ...payload.updates };

                newUpdates = { ...newUpdates };

                yield call(firebase.editBrand, payload.id, newUpdates);
                yield put(editBrandSuccess({
                    id: payload.id,
                    updates: newUpdates
                }));
                yield handleAction(ADMIN_BRANDS, 'Item succesfully edited', 'success');
                yield put(setLoading(false));
            } catch (e) {
                yield handleError(e);
                yield handleAction(undefined, `Item failed to edit: ${e.message}`, 'error');
            }
            break;
        case REMOVE_BRAND:
            try {
                yield initRequest();
                yield call(firebase.removeBrand, payload);
                yield put(removeBrandSuccess(payload));
                yield put(setLoading(false));
                yield handleAction(ADMIN_BRANDS, 'Item succesfully removed', 'success');
            } catch (e) {
                yield handleError(e);
                yield handleAction(undefined, `Item failed to remove: ${e.message}`, 'error');
            }
            break;
        default:
            throw new Error(`Unexpected action type ${type}`);
    }
}

export default brandSaga;
