import {
	ADD_BRAND,
	ADD_BRAND_SUCCESS,
	REMOVE_BRAND,
	REMOVE_BRAND_SUCCESS,
	EDIT_BRAND,
	EDIT_BRAND_SUCCESS,
	GET_BRANDS,
	GET_BRANDS_SUCCESS,
	CANCEL_GET_BRANDS
} from 'constants/constants';

export const getBrands = lastRef => ({
	type: GET_BRANDS,
	payload: lastRef
});

export const getBrandsSuccess = brands => ({
	type: GET_BRANDS_SUCCESS,
	payload: brands
});

export const cancelGetBrands = () => ({
	type: CANCEL_GET_BRANDS
});

export const addBrand = brand => ({
	type: ADD_BRAND,
	payload: brand
});

export const addBrandSuccess = brand => ({
	type: ADD_BRAND_SUCCESS,
	payload: brand
});

export const removeBrand = id => ({
	type: REMOVE_BRAND,
	payload: id
});

export const removeBrandSuccess = id => ({
	type: REMOVE_BRAND_SUCCESS,
	payload: id
});

export const editBrand = brand => ({
	type: EDIT_BRAND,
	payload: brand
});

export const editBrandSuccess = brand => ({
	type: EDIT_BRAND_SUCCESS,
	payload: brand
});
