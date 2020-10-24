import {
	ADD_ORDER_SUCCESS,
	GET_ORDER_SUCCESS,
	GET_ORDERS_SUCCESS
} from 'constants/constants';

export default (state = {
	lastRefKey: null,
	total: 0,
	items: []
}, action) => {
	switch (action.type) {
		case ADD_ORDER_SUCCESS:
			return {
				...state,
				items: [...state.items, action.payload]
			};
		case GET_ORDER_SUCCESS:
			return {
				...state,
				items: [...state.items, ...action.payload.order]
			};
		case GET_ORDERS_SUCCESS:
			return {
				...state,
				lastRefKey: action.payload.lastKey,
				total: action.payload.total,
				items: [...state.items, ...action.payload.orders]
			};
		default:
			return state;
	}
};
