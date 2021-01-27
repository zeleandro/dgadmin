import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectFeatured, selectFilter, selectOnSale } from 'selectors/selector';

import ProductList from 'components/product/ProductList';
import ProductItemCarrousel from 'components/product/ProductItemCarrousel';
import ProductAppliedFilters from 'components/product/ProductAppliedFilters';
import Boundary from 'components/ui/Boundary';
import useDocumentTitle from 'hooks/useDocumentTitle';
import useScrollTop from 'hooks/useScrollTop';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch } from 'react-redux';

import { getProducts } from 'redux/actions/productActions';
import { setLoading } from 'redux/actions/miscActions';

import MessageDisplay from '../../components/ui/MessageDisplay';

const Home = () => {
	useDocumentTitle();
	useScrollTop();

	const [columnCount, setColumnCount] = useState(6);

	const responsive = {
		superLargeDesktop: {
			// the naming can be any, depends on you.
			breakpoint: { max: 4000, min: 3000 },
			items: 5,
			slidesToSlide: 2
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 4,
			slidesToSlide: 4
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 3,
			slidesToSlide: 3
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
			slidesToSlide: 1
		}
	};

	const store = useSelector(state => ({
		filter: state.filter,
		basket: state.basket,
		filteredProducts: selectFilter(state.products.items, state.filter),
		featuredProducts: selectFeatured(state.products.items, state.filter),
		requestStatus: state.app.requestStatus,
		isLoading: state.app.loading,
		products: state.products.items,
		lastRefKey: state.products.lastRefKey,
		productsCount: state.products.items.length,
		totalProductsCount: state.products.total,
	}));

	const [isFetching, setFetching] = useState(false);

	const dispatch = useDispatch();

	const fetchProducts = () => {
		setFetching(true);
		dispatch(getProducts(store.lastRefKey));
	};

	const isAuth = useSelector(state => state.app.authStatus.success)

	useEffect(() => {
		if (store.productsCount === 0) {
			fetchProducts();
		}

		window.scrollTo(0, 0);
		return () => dispatch(setLoading(false));

	}, []);

	useEffect(() => {
		setFetching(false);
	}, [store.lastRefKey]);

	const foundOnBasket = id => store.basket.find(item => item.id === id);

	const onProductsLengthChanged = () => {
		const width = window.screen.width - 250; // minus 250px padding
		const pLen = store.filteredProducts.length;

		setColumnCount(Math.floor(width / 160));
		if ((columnCount >= pLen) && pLen !== 0) {
			setColumnCount(pLen);
		}
	};

	useEffect(() => {
		onProductsLengthChanged();
	}, [store.filteredProducts]);

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
						<ProductAppliedFilters filter={store.filter} />
						<Boundary>

							<div className="section-title center-block text-center">
								<h1>Productos destacados</h1>
								<p>Los productos mas novedosos del mercado y al mejor precio</p>
							</div>

							<Carousel
								responsive={responsive}
								centerMode={false}
								removeArrowOnDeviceType={["tablet", "mobile"]}
								keyBoardControl={true}
								infinite={true}
								slidesToSlide={1}
								swipeable>

								{store.featuredProducts.length === 0 ? new Array(12).fill({}).map((product, index) => (

									<ProductItemCarrousel
										isItemOnBasket={false}
										key={`product-skeleton ${index}`}
										product={product}
									/>
								)) : store.featuredProducts.map(product => (
									<ProductItemCarrousel
										isItemOnBasket={foundOnBasket(product.id)}
										key={product.id}
										isLoading={store.isLoading}
										product={product}
									/>
								))}
							</Carousel>


						</Boundary>

					</div>
				</div>

			</div>

		</>
	);
};

export default Home;
