import {
	ADD_BRAND_SUCCESS,
	REMOVE_BRAND_SUCCESS,
	EDIT_BRAND_SUCCESS,
	GET_BRANDS_SUCCESS
} from 'constants/constants';

export default (state = {
	lastRefKey: null,
	total: 0,
	items: []
}, action) => {
	switch (action.type) {
		case GET_BRANDS_SUCCESS:
			return {
				...state,
				lastRefKey: action.payload.lastKey,
				total: action.payload.total,
				items: [...state.items, ...action.payload.brands]
			};
		case ADD_BRAND_SUCCESS:
			return {
				...state,
				items: [...state.items, action.payload]
			};
		case REMOVE_BRAND_SUCCESS:
			return {
				...state,
				items: state.items.filter(brand => brand.id !== action.payload)
			}
		case EDIT_BRAND_SUCCESS:
			return {
				...state,
				items: state.items.map((brand) => {
					if (brand.id === action.payload.id) {
						return {
							...brand,
							...action.payload.updates
						};
					}
					return brand;
				})
			};
		default:
			return state;
	}
};
