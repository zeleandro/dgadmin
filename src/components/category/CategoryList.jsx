/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-sort-props */
import React, { useEffect, useState } from 'react';
import PropTypes, { object } from 'prop-types';
import { useDispatch } from 'react-redux';

import { getCategories } from 'redux/actions/categoryActions';
import { setLoading } from 'redux/actions/miscActions';
import MessageDisplay from '../ui/MessageDisplay';

const CategoryList = (props) => {
	const [isFetching, setFetching] = useState(false);

	const dispatch = useDispatch();
	const fetchCategories = () => {
		setFetching(true);
		dispatch(getCategories(props.lastRefKey));
	};

	useEffect(() => {
		if (props.categoriesCount === 0) {
			fetchCategories();
		}

		window.scrollTo(0, 0);
		return () => dispatch(setLoading(false));
	}, []);

	useEffect(() => {
		setFetching(false);
	}, [props.lastRefKey]);

    // const foundOnBasket = id => props.basket.find(item => item.id === id);
    const categories = id => props.categories.find(item => item.id === id);

	return props.categories.length === 0 && !props.isLoading && !props.requestStatus ? (
		<MessageDisplay
			message="No se encontraron categorías"
			desc="Pruebe usando filtros o palabras claves"
		/>
	) : props.requestStatus ? (
		<MessageDisplay
			message={props.requestStatus}
			action={fetchCategories}
			buttonLabel="Intentar nuevamente"
		/>
	) : (
				<>
					{/* {props.children({ foundOnBasket })} */}
                    {props.children({ categories })}
					{props.categoriesCount < props.totalCategoriesCount && (
						<div className="d-flex-center padding-l">
							<button
								className="button button-small"
								disabled={isFetching}
								onClick={fetchCategories}
							>
								{isFetching ? 'Buscando categorías...' : 'Mostrar mas categorías'}
							</button>
						</div>
					)}
				</>
			);
};

CategoryList.propType = {
	filter: PropTypes.object,
	categories: PropTypes.arrayOf(object),
	isLoading: PropTypes.bool.isRequired,
	requestStatus: PropTypes.string.isRequired,
	categoriesCount: PropTypes.number.isRequired,
	totalCategoriesCount: PropTypes.number.isRequired,
};

export default CategoryList;
