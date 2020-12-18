import {
	ADD_PRODUCT,
	ADD_PRODUCT_SUCCESS,
	REMOVE_PRODUCT,
	REMOVE_PRODUCT_SUCCESS,
	EDIT_PRODUCT,
	EDIT_PRODUCT_SUCCESS,
	GET_PRODUCTS,
	GET_PRODUCTS_SUCCESS,
	CANCEL_GET_PRODUCTS,
	GET_PRODUCTS_ONSALE,
	GET_PRODUCTS_ONSALE_SUCCESS,
	GET_PRODUCTS_BYCATEGORY,
	GET_PRODUCTS_BYCATEGORY_SUCCESS
} from 'constants/constants';

export const getProducts = lastRef => ({
	type: GET_PRODUCTS,
	payload: lastRef
});

export const getProductsSuccess = products => ({
	type: GET_PRODUCTS_SUCCESS,
	payload: products
});

export const getProductsOnSale = lastRef => ({
	type: GET_PRODUCTS_ONSALE,
	payload: lastRef
});

export const getProductsOnSaleSuccess = products => ({
	type: GET_PRODUCTS_ONSALE_SUCCESS,
	payload: products
});

export const getProductsByCategory = category => ({
	type: GET_PRODUCTS_BYCATEGORY,
	payload: category
});

export const getProductsByCategorySuccess = products => ({
	type: GET_PRODUCTS_BYCATEGORY_SUCCESS,
	payload: products
});

export const cancelGetProducts = () => ({
	type: CANCEL_GET_PRODUCTS
});

export const addProduct = product => ({
	type: ADD_PRODUCT,
	payload: product
});

export const addProductSuccess = product => ({
	type: ADD_PRODUCT_SUCCESS,
	payload: product
});

export const removeProduct = id => ({
	type: REMOVE_PRODUCT,
	payload: id
});

export const removeProductSuccess = id => ({
	type: REMOVE_PRODUCT_SUCCESS,
	payload: id
});

export const editProduct = (id, updates) => ({
	type: EDIT_PRODUCT,
	payload: {
		id,
		updates
	}
});

export const editProductSuccess = updates => ({
	type: EDIT_PRODUCT_SUCCESS,
	payload: updates
});
