import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import useDocumentTitle from 'hooks/useDocumentTitle';
import useScrollTop from 'hooks/useScrollTop';
import { editBrand } from 'redux/actions/brandActions';
import BrandForm from '../components/BrandForm';

const EditBrand = (props) => {
	useDocumentTitle('DG Limpieza | Marca');
	useScrollTop();
	const { brand, isLoading } = useSelector(state => ({
		brand: state.brands.items.find(item => item.id === props.match.params.id),
		isLoading: state.app.loading
	}));
	const dispatch = useDispatch();

	const onSubmitForm = (updates) => {
		dispatch(editBrand(updates));
    };

	return (
		<div className="product-form-container">
			{!brand && <Redirect to="/dashboard/brands" />}
			<h2>Marca</h2>
			<BrandForm
				isLoading={isLoading}
				onSubmit={onSubmitForm}
				brand={brand}
			/>
		</div>
	);
};

export default withRouter(EditBrand);
