/* eslint-disable indent */
import { call, put, select, all } from 'redux-saga/effects';
import firebase from 'firebase/firebase';

import {
    LOADING,
    SET_REQUEST_STATUS,
    GET_CATEGORIES,
    ADD_CATEGORY,
    EDIT_CATEGORY,
    REMOVE_CATEGORY
} from 'constants/constants';

import {
    getCategoriesSuccess,
    addCategorySuccess,
    editCategorySuccess,
    removeCategorySuccess
} from '../actions/categoryActions';
import { setLoading, setRequestStatus } from 'redux/actions/miscActions'

import { displayActionMessage } from 'helpers/utils';
import { history } from 'routers/AppRouter';
import { ADMIN_CATEGORIES } from 'constants/routes';

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

function* categoriesaga({ type, payload }) {
    switch (type) {
        case GET_CATEGORIES:
            try {
                yield initRequest();
                const state = yield select();
                const result = yield call(firebase.getCategories, payload);

                yield put(getCategoriesSuccess({
                    categories: result.categories,
                    lastKey: result.lastKey ? result.lastKey : state.categories.lastRefKey,
                    total: result.total ? result.total : state.categories.total
                }));
                // yield put({ type: SET_LAST_REF_KEY, payload: result.lastKey });
                yield put(setLoading(false));
            } catch (e) {
                yield handleError(e);
            }
            break;
        case ADD_CATEGORY:
            try {
                yield initRequest();

                const key = yield call(firebase.generateCategoryKey);

                const category = {
                    ...payload
                };

                yield call(firebase.addCategory, key, category);
                yield put(addCategorySuccess({
                    id: key,
                    ...category
                }));
                yield handleAction(ADMIN_CATEGORIES, 'Item succesfully added', 'success');
                yield put(setLoading(false));
            } catch (e) {
                yield handleError(e);
                yield handleAction(undefined, `Item failed to add: ${e.message_}`, 'error');
            }
            break;
        case EDIT_CATEGORY:
            try {
                yield initRequest();

                const key = payload.id;

				const category = {
					...payload
                };

                yield call(firebase.editCategory, key, category);
                yield put(editCategorySuccess({
                    id: key,
                    ...category
                }));
                yield handleAction(ADMIN_CATEGORIES, 'Item succesfully edited', 'success');
                yield put(setLoading(false));
            } catch (e) {
                yield handleError(e);
                yield handleAction(undefined, `Item failed to edit: ${e.message}`, 'error');
            }
            break;
        case REMOVE_CATEGORY:
            try {
                yield initRequest();
                yield call(firebase.removeCategory, payload);
                yield put(removeCategorySuccess(payload));
                yield put(setLoading(false));
                yield handleAction(ADMIN_CATEGORIES, 'Item succesfully removed', 'success');
            } catch (e) {
                yield handleError(e);
                yield handleAction(undefined, `Item failed to remove: ${e.message}`, 'error');
            }
            break;
        default:
            throw new Error(`Unexpected action type ${type}`);
    }
}

export default categoriesaga;
