import {
	ADD_ORDER
} from 'constants/constants';

export default (state = {
	lastRefKey: null,
	total: 0,
	items: []
}, action) => {
	switch (action.type) {
		case ADD_ORDER:
            console.log('en el reducer');
			return {
				...state,
				items: [...state.items, action.payload]
			};
		default:
			return state;
	}
};
