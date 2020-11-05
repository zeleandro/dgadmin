import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useDocumentTitle from 'hooks/useDocumentTitle';
import useScrollTop from 'hooks/useScrollTop';

import { selectFilter } from 'selectors/selector';
import Boundary from 'components/ui/Boundary';

import CategoryList from '../components/CategoryList';
import CategoryItem from '../components/CategoryItem';

import { ADD_CATEGORY } from 'constants/routes';

const Categories = ({ history }) => {
	useDocumentTitle('DG Limpieza | Categorias');
	useScrollTop();

	const store = useSelector(state => ({
		filter: state.filter,
		filteredCategories: selectFilter(state.categories.items, state.filter),
		requestStatus: state.app.requestStatus,
		isLoading: state.app.loading,
		categories: state.categories,
		categoriesCount: state.categories.items.length,
		totalCategoriesCount: state.categories.total,
	}));

	const onClickAddCategory = () => {
		history.push(ADD_CATEGORY);
	};

	return (
		<Boundary>
			<div className="product-admin-header">
				<h3 className="product-admin-header-title">
					Categorías &nbsp;
					({`${store.categoriesCount} / ${store.totalCategoriesCount}`})
				</h3>
				&nbsp;
				<button
					className="button button-small"
					onClick={onClickAddCategory}
				>
					Nueva Categoría
				</button>
			</div>
			<div className="product-admin-items">
				<CategoryList {...store}>
					{() => (
						<>
							{/* <categoryAppliedFilters filter={store.filter} /> */}
							{(
								<div className="grid grid-product grid-count-6">
									<div className="grid-col">
										<h5>Nombre</h5>
									</div>
								</div>
							)}
							{store.categories.length === 0 ? new Array(10).fill({}).map((category, index) => (
								<CategoryItem
									key={`product-skeleton ${index}`}
									category={category}
								/>
							)) : store.categories.items.map(category => (
								<CategoryItem
									key={category.email}
									category={category}
								/>
							))}
						</>
					)}
				</CategoryList>
			</div>
		</Boundary>
	);
};

export default withRouter(Categories);
