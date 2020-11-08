import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import useDocumentTitle from 'hooks/useDocumentTitle';
import useScrollTop from 'hooks/useScrollTop';
import { addBrand } from 'redux/actions/brandActions';
import BrandForm from '../components/BrandForm';

const AddBrand = () => {
	useScrollTop();
	useDocumentTitle('DG Limpieza | Agregar Marcas');
	const isLoading = useSelector(state => state.app.loading);
	const dispatch = useDispatch();

	const onSubmit = (brand) => {
		dispatch(addBrand(brand));
	};

	return (
		<div className="product-form-container">
			<h2>Agregar Nueva Marca</h2>
			<BrandForm
				isLoading={isLoading}
				onSubmit={onSubmit}
			/>
		</div>
	);
};

export default withRouter(AddBrand);