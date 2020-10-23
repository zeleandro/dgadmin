import React from 'react';
import useDocumentTitle from 'hooks/useDocumentTitle';
import useScrollTop from 'hooks/useScrollTop';

const Dashboard = () => {
	useDocumentTitle('DG Limpieza | Administracion');
	useScrollTop();

	return (
		<div className="loader">
			<h2>Bienvenido al Panel de Administración</h2>
		</div>
	);
};

export default Dashboard;
