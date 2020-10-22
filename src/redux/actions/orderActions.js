import {
	ADD_ORDER,
	ADD_ORDER_SUCCESS
} from 'constants/constants';

export const addOrder = order => ({
	type: ADD_ORDER,
	payload: order
});

export const addOrderSuccess = order => ({
	type: ADD_ORDER_SUCCESS,
	payload: order
});
