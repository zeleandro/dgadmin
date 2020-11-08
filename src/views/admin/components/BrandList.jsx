/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-sort-props */
import React, { useEffect, useState } from 'react';
import PropTypes, { object } from 'prop-types';
import { useDispatch } from 'react-redux';

import { getBrands } from 'redux/actions/brandActions';
import { setLoading } from 'redux/actions/miscActions';
import MessageDisplay from 'components/ui/MessageDisplay';

const BrandList = (props) => {
	const [isFetching, setFetching] = useState(false);

	const dispatch = useDispatch();
	const fetchBrands = () => {
        setFetching(true);
        dispatch(getBrands(props.lastRefKey));
	};

	useEffect(() => {
		if (props.brandsCount === 0) {
            fetchBrands();
		}

		window.scrollTo(0, 0);
		return () => dispatch(setLoading(false));
	}, []);

	useEffect(() => {
		setFetching(false);
	}, [props.lastRefKey]);

	const brand = id => props.brands.find(item => item.id === id);

	return props.filteredBrands.length === 0 && !props.isLoading && !props.requestStatus ? (
		<MessageDisplay
			message="No se encontraron marcas"
			desc="Pruebe usando filtros o palabras claves"
		/>
	) : props.requestStatus ? (
		<MessageDisplay
			message={props.requestStatus}
			action={fetchBrands}
			buttonLabel="Intentar nuevamente"
		/>
	) : (
				<>
					{props.children({ brand })}
					{props.brandsCount < props.totalBrandsCount && (
						<div className="d-flex-center padding-l">
							<button
								className="button button-small"
								disabled={isFetching}
								onClick={fetchBrands}
							>
								{isFetching ? 'Buscando marcas...' : 'Mostrar mas marcas'}
							</button>
						</div>
					)}
				</>
			);
};

BrandList.propType = {
	filter: PropTypes.object,
	basket: PropTypes.arrayOf(object),
	filteredBrands: PropTypes.arrayOf(PropTypes.object),
	brands: PropTypes.arrayOf(object),
	isLoading: PropTypes.bool.isRequired,
	requestStatus: PropTypes.string.isRequired,
	brandsCount: PropTypes.number.isRequired,
	totalBrandsCount: PropTypes.number.isRequired,
	filteredBrandsLength: PropTypes.number.isRequired,
};

export default BrandList;
