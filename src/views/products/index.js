import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from 'selectors/selector';
import { Redirect, useParams } from 'react-router-dom';

import ProductList from 'components/product/ProductList';
// import ProductList from 'components/product/ProductListCategory';
import ProductItem from 'components/product/ProductItem';
import { resetFilter, applyFilter } from 'redux/actions/filterActions';
import ProductAppliedFilters from 'components/product/ProductAppliedFilters';
import Boundary from 'components/ui/Boundary';
import useDocumentTitle from 'hooks/useDocumentTitle';
import useScrollTop from 'hooks/useScrollTop';

import MessageDisplay from '../../components/ui/MessageDisplay';

const Product = ({ history }) => {
	useScrollTop();

	const dispatch = useDispatch();
	const { category } = useParams();
	const [columnCount, setColumnCount] = useState(6);

	const [field, setFilter] = useState({
		category: category ? category.toLowerCase() : ''
	});

	const onCategoryParam = () => {
		if (category) {
			dispatch(applyFilter(field));
		}
	}

	const store = useSelector(state => ({
		filter: state.filter,
		basket: state.basket,
		filteredProducts: selectFilter(state.products.items, state.filter),
		requestStatus: state.app.requestStatus,
		isLoading: state.app.loading,
		products: state.products.items,
		lastRefKey: state.products.lastRefKey,
		productsCount: state.products.items.length,
		totalProductsCount: state.products.total,
	}));

	useDocumentTitle(`DG Limpieza | ${store.filter.category}`);

	const onProductsLengthChanged = () => {
		const width = window.screen.width - 250; // minus 250px padding
		const pLen = store.filteredProducts.length;

		setColumnCount(Math.floor(width / 160));
		if ((columnCount >= pLen) && pLen !== 0) {
			setColumnCount(pLen);
		}
	};

	const isAuth = useSelector(state => state.app.authStatus.success)

	useEffect(() => {
		onCategoryParam();
	}, [category]);

	const productListWrapper = useRef(null);

	const isFiltered = ['keyword', 'brand', 'category', 'minPrice', 'maxPrice', 'sortBy'].some(key => !!store.filter[key]);

	return (
		<>
			<div className="col-xl-12 col-lg-12 col-md-12">
				<div className="card mb-lg-0">
					{(isAuth != true) ?
						<MessageDisplay
							message="Para acceder a los precios y poder realizar la compra, debe registrarse"
							desc=""
						/>
						: ''
					}
					<div className="card-body">
						{!store.requestStatus && (
							<div className="product-list-header">
								<div className="product-list-header-title">
									{isFiltered && (
										<h5>
											{store.filteredProducts.length > 0
												&& `Se encontraron ${store.filteredProducts.length} ${store.filteredProducts.length > 1 ? 'productos' : 'producto'}`
											}
										</h5>
									)}
								</div>
							</div>
						)}
						<ProductAppliedFilters filter={store.filter} from='/category' />
						<Boundary>
							<ProductList {...store} category={category}>
								{({ foundOnBasket }) => (
									<>
										<div className="item2-gl ">
											<div className="tab-content">
												<div className="tab-pane active show" id="tab-12">
													<div className="row">
														{store.filteredProducts.length === 0 ? new Array(12).fill({}).map((product, index) => (
															<ProductItem
																isItemOnBasket={false}
																key={`product-skeleton ${index}`}
																product={product}
															/>
														)) : store.filteredProducts.map(product => (
															<ProductItem
																isItemOnBasket={foundOnBasket(product.id)}
																key={product.id}
																isLoading={store.isLoading}
																product={product}
															/>
														))}
													</div>
												</div>
											</div>
										</div>
									</>
								)}
							</ProductList>
						</Boundary>
					</div>
				</div>
			</div>
		</>
	);
};

export default Product;
