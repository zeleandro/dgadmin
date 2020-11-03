import { 
	ADD_USER, 
	EDIT_USER, 
	DELETE_USER, 
	GET_USERS_SUCCESS 
} from 'constants/constants';

export default (state = {
	lastRefKey: null,
	total: 0,
	items: []
}, action) => {
	switch (action.type) {
		case ADD_USER:
			return [...state, action.payload];
		case EDIT_USER:
			return state.map((user) => {
				if (user.id === action.payload.id) {
					return {
						...user,
						...action.payload
					};
				}
				return user;
			});
		case DELETE_USER:
			return state.filter(user => user.id !== action.payload);
		case GET_USERS_SUCCESS:
			return {
				...state,
				lastRefKey: action.payload.lastKey,
				total: action.payload.total,
				items: [...state.items, ...action.payload.users]
			};
		default:
			return state;
	}
};
