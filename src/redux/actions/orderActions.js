import {
	ADD_ORDER,
	ADD_ORDER_SUCCESS,
	EDIT_ORDER,
	EDIT_ORDER_SUCCESS,
	GET_ORDER,
	GET_ORDER_SUCCESS,
	GET_ORDERS,
	GET_ORDERS_SUCCESS
} from 'constants/constants';

export const addOrder = order => ({
	type: ADD_ORDER,
	payload: order
});

export const addOrderSuccess = order => ({
	type: ADD_ORDER_SUCCESS,
	payload: order
});

export const editOrder = order => ({
	type: EDIT_ORDER,
	payload: order
});

export const editOrderSuccess = order => ({
	type: EDIT_ORDER_SUCCESS,
	payload: order
});

export const getOrder = lastRef => ({
	type: GET_ORDER,
	payload: lastRef
});

export const getOrderSuccess = order => ({
	type: GET_ORDER_SUCCESS,
	payload: order
});

export const getOrders = lastRef => ({
	type: GET_ORDERS,
	payload: lastRef
});

export const getOrdersSuccess = orders => ({
	type: GET_ORDERS_SUCCESS,
	payload: orders
});
