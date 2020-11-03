/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-sort-props */
import React, { useEffect, useState } from 'react';
import PropTypes, { object } from 'prop-types';
import { useDispatch } from 'react-redux';

import { getUsers } from 'redux/actions/userActions';
import { setLoading } from 'redux/actions/miscActions';
import MessageDisplay from 'components/ui/MessageDisplay';

const UserList = (props) => {
	const [isFetching, setFetching] = useState(false);

	const dispatch = useDispatch();
	const fetchUsers = () => {
        setFetching(true);
        dispatch(getUsers(props.lastRefKey));
	};

	useEffect(() => {
		if (props.usersCount === 0) {
            fetchUsers();
		}

		window.scrollTo(0, 0);
		return () => dispatch(setLoading(false));
	}, []);

	useEffect(() => {
		setFetching(false);
	}, [props.lastRefKey]);

	const user = id => props.users.find(item => item.id === id);

	return props.filteredUsers.length === 0 && !props.isLoading && !props.requestStatus ? (
		<MessageDisplay
			message="No se encontraron usuarios"
			desc="Pruebe usando filtros o palabras claves"
		/>
	) : props.requestStatus ? (
		<MessageDisplay
			message={props.requestStatus}
			action={fetchUsers}
			buttonLabel="Intentar nuevamente"
		/>
	) : (
				<>
					{props.children({ user })}
					{props.usersCount < props.totalusersCount && (
						<div className="d-flex-center padding-l">
							<button
								className="button button-small"
								disabled={isFetching}
								onClick={fetchUsers}
							>
								{isFetching ? 'Buscando usuarios...' : 'Mostrar mas usuarios'}
							</button>
						</div>
					)}
				</>
			);
};

UserList.propType = {
	filter: PropTypes.object,
	basket: PropTypes.arrayOf(object),
	filteredUsers: PropTypes.arrayOf(PropTypes.object),
	users: PropTypes.arrayOf(object),
	isLoading: PropTypes.bool.isRequired,
	requestStatus: PropTypes.string.isRequired,
	usersCount: PropTypes.number.isRequired,
	totalusersCount: PropTypes.number.isRequired,
	filteredUsersLength: PropTypes.number.isRequired,
};

export default UserList;
