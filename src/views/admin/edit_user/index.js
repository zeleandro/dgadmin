import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import useDocumentTitle from 'hooks/useDocumentTitle';
import useScrollTop from 'hooks/useScrollTop';
// import { editUser } from 'redux/actions/userActions';
import UserForm from '../components/UserForm';

const EditUser = (props) => {
	useDocumentTitle('DG Limpieza | Usuario');
	useScrollTop();
	const { user, isLoading } = useSelector(state => ({
		user: state.users.items.find(item => item.id === props.match.params.id),
		isLoading: state.app.loading
	}));
	const dispatch = useDispatch();

	const onSubmitForm = (updates) => {
		// dispatch(editUser(updates));
    };

	return (
		<div className="product-form-container">
			{!user && <Redirect to="/dashboard/users" />}
			<h2>Usuario</h2>
			<UserForm
				isLoading={isLoading}
				onSubmit={onSubmitForm}
				user={user}
			/>
		</div>
	);
};

export default withRouter(EditUser);
