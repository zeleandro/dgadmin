import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useDocumentTitle from 'hooks/useDocumentTitle';
import useScrollTop from 'hooks/useScrollTop';
import { ADD_PRODUCT } from 'constants/routes';
import ProductAppliedFilters from 'components/product/ProductAppliedFilters';
import { selectFilter } from 'selectors/selector';
import ProductList from 'components/product/ProductList';
import Boundary from 'components/ui/Boundary';
import SearchBar from 'components/ui/SearchBar';
import FiltersToggle from 'components/ui/FiltersToggle';
import ProductItem from '../components/ProductItem';

const Products = ({ history }) => {
	useDocumentTitle('DG Limpieza | Productos');
	useScrollTop();

	const store = useSelector(state => ({
		filter: state.filter,
		basket: state.basket,
		filteredProducts: selectFilter(state.products.items, state.filter),
		requestStatus: state.app.requestStatus,
		isLoading: state.app.loading,
		products: state.products.items,
		productsCount: state.products.items.length,
		totalProductsCount: state.products.total,
	}));

	const onClickAddProduct = () => {
		history.push(ADD_PRODUCT);
	};

	// TODO insufficient permission
	// TODO fix filters modal
	return (
		<Boundary>
			<div className="product-admin-header">
				<h3 className="product-admin-header-title">
					Productos &nbsp;
					({`${store.productsCount} / ${store.totalProductsCount}`})
				</h3>
				<SearchBar
					filter={store.filter}
					isLoading={store.isLoading}
					productsCount={store.productsCount}
				/>
				&nbsp;
				<FiltersToggle
					filter={store.filter}
					isLoading={store.isLoading}
					products={store.products}
					productsCount={store.productsCount}
				>
					<button className="button-muted button-small">
						Mas Filtros &nbsp;<i className="fa fa-chevron-right" />
					</button>
				</FiltersToggle>
				<button
					className="button button-small"
					onClick={onClickAddProduct}
				>
					Nuevo Producto
				</button>
			</div>
			<div className="product-admin-items">
				<ProductList {...store}>
					{() => (
						<>
							<ProductAppliedFilters filter={store.filter} />
							{store.filteredProducts.length > 0 && (
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
							{store.filteredProducts.length === 0 ? new Array(10).fill({}).map((product, index) => (
								<ProductItem
									key={`product-skeleton ${index}`}
									product={product}
								/>
							)) : store.filteredProducts.map(product => (
								<ProductItem
									key={product.id}
									product={product}
								/>
							))}
						</>
					)}
				</ProductList>
			</div>
		</Boundary>
	);
};

export default withRouter(Products);
