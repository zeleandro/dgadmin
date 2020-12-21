/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-sort-props */
import React, { useEffect, useState } from 'react';
import PropTypes, { object } from 'prop-types';
import { useDispatch } from 'react-redux';

import { getProductsByCategory } from 'redux/actions/productActions';
import { setLoading } from 'redux/actions/miscActions';
import MessageDisplay from '../ui/MessageDisplay';

const ProductList = (props) => {
	const [isFetching, setFetching] = useState(false);

	const dispatch = useDispatch();
	const fetchProducts = () => {
		setFetching(true);
		dispatch(getProductsByCategory(props.category));
	};

	useEffect(() => {
		if (props.productsCount === 0) {
			fetchProducts();
		}

		window.scrollTo(0, 0);
		return () => dispatch(setLoading(false));
		
	}, [props.category]);

	useEffect(() => {
		setFetching(false);
	}, [props.category]);

	const foundOnBasket = id => props.basket.find(item => item.id === id);

	return props.filteredProducts.length === 0 && !props.isLoading && !props.requestStatus ? (
		<MessageDisplay
			message="No se encontraron productos"
			desc="Pruebe usando filtros o palabras claves"
		/>
	) : props.requestStatus ? (
		<MessageDisplay
			message={props.requestStatus}
			action={fetchProducts}
			buttonLabel="Intentar nuevamente"
		/>
	) : (
				<>
					{props.children({ foundOnBasket })}
					{props.productsCount < props.totalProductsCount && (
						<div className="d-flex-center padding-l">
							<button
								className="button button-small"
								disabled={isFetching}
								onClick={fetchProducts}
							>
								{isFetching ? 'Buscando productos...' : 'Mostrar mas productos'}
							</button>
						</div>
					)}
				</>
			);
};

ProductList.propType = {
	filter: PropTypes.object,
	basket: PropTypes.arrayOf(object),
	filteredProducts: PropTypes.arrayOf(PropTypes.object),
	products: PropTypes.arrayOf(object),
	isLoading: PropTypes.bool.isRequired,
	requestStatus: PropTypes.string.isRequired,
	productsCount: PropTypes.number.isRequired,
	totalProductsCount: PropTypes.number.isRequired,
	filteredProductsLength: PropTypes.number.isRequired,
};

export default ProductList;
