import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useDocumentTitle from 'hooks/useDocumentTitle';
import useScrollTop from 'hooks/useScrollTop';
import Boundary from 'components/ui/Boundary';


const Users = ({ history }) => {
	useDocumentTitle('DG Limpieza | Usuarios');
	useScrollTop();

	const store = useSelector(state => ({
		requestStatus: state.app.requestStatus,
		isLoading: state.app.loading
	}));

	// TODO insufficient permission
	// TODO fix filters modal
	return (
		<Boundary>
			<div className="product-admin-header">
				<h3 className="product-admin-header-title">
					Usuarios &nbsp;
				</h3>
			</div>
			<div className="product-admin-items">
				<h4>Aca van los usuarios</h4>
			</div>
		</Boundary>
	);
};

export default withRouter(Users);
