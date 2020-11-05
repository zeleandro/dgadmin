import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import useDocumentTitle from 'hooks/useDocumentTitle';
import useScrollTop from 'hooks/useScrollTop';
import { editCategory } from 'redux/actions/categoryActions';
import CategoryForm from '../components/CategoryForm';

const EditCategory = (props) => {
	useDocumentTitle('DG Limpieza | Categoria');
	useScrollTop();
	const { category, isLoading } = useSelector(state => ({
		category: state.categories.items.find(item => item.id === props.match.params.id),
		isLoading: state.app.loading
	}));
	const dispatch = useDispatch();

	const onSubmitForm = (updates) => {
		dispatch(editCategory(updates));
    };

	return (
		<div className="product-form-container">
			{!category && <Redirect to="/dashboard/categories" />}
			<h2>Categoría</h2>
			<CategoryForm
				isLoading={isLoading}
				onSubmit={onSubmitForm}
				category={category}
			/>
		</div>
	);
};

export default withRouter(EditCategory);
