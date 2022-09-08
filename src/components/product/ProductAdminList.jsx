/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-sort-props */
import React, { useEffect, useState } from 'react';
import PropTypes, { object } from 'prop-types';
import MessageDisplay from '../ui/MessageDisplay';

const ProductAdminList = (props) => {

	const foundOnBasket = id => props.basket.find(item => item.id === id);

	return props.filteredProducts.length === 0 ? (
		<MessageDisplay
			message="No se encontraron productos"
			desc="Pruebe usando filtros o palabras claves"
		/>
	) : (
				<>
					{props.children({ foundOnBasket })}
					{(
						<div className="d-flex-center padding-l">
						</div>
					)}
				</>
			);
};

ProductAdminList.propType = {
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

export default ProductAdminList;
