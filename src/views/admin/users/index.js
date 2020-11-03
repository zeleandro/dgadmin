import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useDocumentTitle from 'hooks/useDocumentTitle';
import useScrollTop from 'hooks/useScrollTop';
// import userAppliedFilters from 'components/user/userAppliedFilters';
import { selectFilter } from 'selectors/selector';
import Boundary from 'components/ui/Boundary';
import SearchBar from 'components/ui/SearchBar';
import FiltersToggle from 'components/ui/FiltersToggle';
import UserList from '../components/UserList';
import UserItem from '../components/UserItem';

const Users = ({ history }) => {
	useDocumentTitle('DG Limpieza | Usuarios');
	useScrollTop();

	const store = useSelector(state => ({
		filter: state.filter,
		filteredUsers: selectFilter(state.users.items, state.filter),
		requestStatus: state.app.requestStatus,
		isLoading: state.app.loading,
		users: state.users,
		usersCount: state.users.items.length,
		totalUsersCount: state.users.total,
	}));

	// TODO insufficient permission
	// TODO fix filters modal
	return (
		<Boundary>
			<div className="product-admin-header">
				<h3 className="product-admin-header-title">
					Usuarios &nbsp;
					({`${store.usersCount} / ${store.totalUsersCount}`})
				</h3>
				<SearchBar
					filter={store.filter}
					isLoading={store.isLoading}
					usersCount={store.usersCount}
				/>
				&nbsp;
			</div>
			<div className="product-admin-items">
				<UserList {...store}>
					{() => (
						<>
							{/* <userAppliedFilters filter={store.filter} /> */}
							{(
								<div className="grid grid-product grid-count-6">
									<div className="grid-col" />
									<div className="grid-col">
										<h5>Nombre</h5>
									</div>
									<div className="grid-col">
										<h5>Email</h5>
									</div>
									<div className="grid-col">
										<h5>Address</h5>
									</div>
								</div>
							)}
							{store.users.length === 0 ? new Array(10).fill({}).map((user, index) => (
								<UserItem
									key={`product-skeleton ${index}`}
									user={user}
								/>
							)) : store.users.items.map(user => (
								<UserItem
									key={user.email}
									user={user}
								/>
							))}
						</>
					)}
				</UserList>
			</div>
		</Boundary>
	);
};

export default withRouter(Users);
