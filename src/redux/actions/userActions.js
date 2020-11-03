import {
	REGISTER_USER,
	GET_USER,
	ADD_USER,
	EDIT_USER,
	DELETE_USER,
	GET_USERS,
	GET_USERS_SUCCESS
} from 'constants/constants';

// insert in profile array
export const registerUser = user => ({
	type: REGISTER_USER,
	payload: user
});

export const getUser = uid => ({
	type: GET_USER,
	payload: uid
});

// different from registerUser -- only inserted in admins' users array not in profile array
export const addUser = user => ({
	type: ADD_USER,
	payload: user
});

export const editUser = updates => ({
	type: EDIT_USER,
	payload: updates
});

export const deleteUser = id => ({
	type: DELETE_USER,
	payload: id
});

export const getUsers = lastRef => ({
	type: GET_USERS,
	payload: lastRef
});

export const getUsersSuccess = users => ({
	type: GET_USERS_SUCCESS,
	payload: users
});