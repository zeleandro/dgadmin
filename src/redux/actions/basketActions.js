import {
	ADD_TO_BASKET,
	REMOVE_FROM_BASKET,
	CLEAR_BASKET,
	ADD_QTY_ITEM,
	MINUS_QTY_ITEM
} from 'constants/constants';

export const addToBasket = product => ({
	type: ADD_TO_BASKET,
	payload: product
});

export const removeFromBasket = id => ({
	type: REMOVE_FROM_BASKET,
	payload: id
});

export const clearBasket = () => ({
	type: CLEAR_BASKET
});

export const addQtyItem = product => ({
	type: ADD_QTY_ITEM,
	payload: product
});

export const minusQtyItem = product => ({
	type: MINUS_QTY_ITEM,
	payload: product
});
