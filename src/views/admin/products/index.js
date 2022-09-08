import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useDocumentTitle from 'hooks/useDocumentTitle';
import useScrollTop from 'hooks/useScrollTop';
import { ADD_PRODUCT } from 'constants/routes';
import ProductAppliedFilters from 'components/product/ProductAppliedFilters';
import { selectFilter } from 'selectors/selector';
import ProductAdminList from 'components/product/ProductAdminList';
import Boundary from 'components/ui/Boundary';
import SearchBar from 'components/ui/SearchBar';
import FiltersToggle from 'components/ui/FiltersToggle';
import ProductItem from '../components/ProductItem';

import { getCategories } from 'redux/actions/categoryActions';
import { getProducts } from 'redux/actions/productActions';

const Products = ({ history }) => {
	useDocumentTitle('DG Limpieza | Productos');
	useScrollTop();

	const dispatch = useDispatch();

	const [category, setCategory] = useState(null);
	const [categories, setCategories] = useState(null);
	const [filteredProducts, setFilteredProducts] = useState(null)
	const [isFetching, setFetching] = useState(false);

	const store = useSelector(state => ({
		filter: state.filter,
		basket: state.basket,
		// filteredProducts: selectFilter(state.products.items, state.filter),
		requestStatus: state.app.requestStatus,
		isLoading: state.app.loading,
		products: state.products.items,
		productsCount: state.products.items.length,
		totalProductsCount: state.products.total,
		categories: state.categories.items
	}));

	const onClickAddProduct = () => {
		history.push(ADD_PRODUCT);
	};

	const onCategoryFilterChange = (e) => {
		setCategory(e.target.value)
	};

	useEffect(() => {
		if (!categories) {
			dispatch(getCategories());
		}
		setCategories(store.categories)
		if (!category && categories) 
		{
			setCategory(categories[0])
		}
	}, [store.categories]);

	useEffect(() => {
		if (!filteredProducts) {
			dispatch(getProducts());
		}
		setFilteredProducts(
			store.products.filter(
				item => item.category.toLowerCase() == category
			)
		)
	}, [category]);

	// TODO insufficient permission
	// TODO fix filters modal
	return (
		<Boundary>
			<div className="product-admin-header">
				<h3 className="product-admin-header-title">
					Productos &nbsp;
					({`${store.productsCount} / ${store.totalProductsCount}`})
				</h3>
				{store.productsCount === 0 && store.isLoading ? (
					<h5 className="text-subtle">Cargando</h5>
				) : (
						<select
							name="category"
							className="filters-brand"
							value={category ? category.value : null}
							// disabled={store.isLoading || store.productsCount === 0}
							onChange={onCategoryFilterChange}
						>
							{
								categories &&
								categories.map(item => (
									<option key={item.id} value={item.name.toLowerCase()}>{item.name}</option>
								))
							}
						</select>
					)}
				<button
					className="button button-small"
					onClick={onClickAddProduct}
				>
					Nuevo Producto
				</button>
			</div>
			<div className="product-admin-items">
				<ProductAdminList filteredProducts >
					{() => (
						<>
							{/* <ProductAppliedFilters filter={store.filter} /> */}
							{filteredProducts && (
								<div className="grid grid-product grid-count-6">
									<div className="grid-col" />
									<div className="grid-col">
										<h5>Nombre</h5>
									</div>
									<div className="grid-col">
										<h5>Marca</h5>
									</div>
									<div className="grid-col">
										<h5>Categoría</h5>
									</div>
									<div className="grid-col">
										<h5>Precio</h5>
									</div>
									<div className="grid-col">
										<h5>Fecha de carga</h5>
									</div>
									<div className="grid-col">
										<h5>Cantidad</h5>
									</div>
								</div>
							)}
							{
								filteredProducts &&
								filteredProducts.map(product => (
									<ProductItem
										key={product.id}
										product={product}
									/>
								))
							}
						</>
					)}
				</ProductAdminList>
			</div>
		</Boundary>
	);
};

export default withRouter(Products);
