/* eslint-disable no-nested-ternary */
import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { applyFilter } from 'redux/actions/filterActions';

const ProductAppliedFilters = ({ filter }) => {
	const dispatch = useDispatch();
	const fields = ['brand', 'category', 'minPrice', 'maxPrice', 'sortBy', 'keyword'];

	const onRemoveKeywordFilter = () => {
		dispatch(applyFilter({ keyword: '' }));
	};

	const onRemovePriceRangeFilter = () => {
		dispatch(applyFilter({ minPrice: 0, maxPrice: 0 }));
	};

	const onRemoveBrandFilter = () => {
		dispatch(applyFilter({ brand: '' }));
	};

	const onRemoveCategoryFilter = () => {
		dispatch(applyFilter({ category: '' }));
	};

	const onRemoveSortFilter = () => {
		dispatch(applyFilter({ sortBy: '' }));
	};

	return !fields.some(key => !!filter[key]) ? null : (
		<div className="product-applied-filters">
			{filter.keyword && (
				<div className="pill-wrapper">
					<span className="d-block">Palabra clave</span>
					<div className="pill padding-right-l">
						<h5 className="pill-content margin-0">{filter.keyword}</h5>
						<div className="pill-remove" onClick={onRemoveKeywordFilter}>
							<h5 className="margin-0 text-subtle"><i className="fa fa-times-circle" /></h5>
						</div>
					</div>
				</div>
			)}
			{filter.brand && (
				<div className="pill-wrapper">
					<span className="d-block">Marca</span>
					<div className="pill padding-right-l">
						<h5 className="pill-content margin-0">{filter.brand}</h5>
						<div className="pill-remove" onClick={onRemoveBrandFilter}>
							<h5 className="margin-0 text-subtle"><i className="fa fa-times-circle" /></h5>
						</div>
					</div>
				</div>
			)}
			{filter.category && (
				<div className="pill-wrapper">
					<span className="d-block">Categoría</span>
					<div className="pill padding-right-l">
						<h5 className="pill-content margin-0">{filter.category}</h5>
						<div className="pill-remove" onClick={onRemoveCategoryFilter}>
							<h5 className="margin-0 text-subtle"><i className="fa fa-times-circle" /></h5>
						</div>
					</div>
				</div>
			)}
			{(!!filter.minPrice || !!filter.maxPrice) && (
				<div className="pill-wrapper">
					<span className="d-block">Rango de Precios</span>
					<div className="pill padding-right-l">
						<h5 className="pill-content margin-0">${filter.minPrice} - ${filter.maxPrice}</h5>
						<div className="pill-remove" onClick={onRemovePriceRangeFilter}>
							<h5 className="margin-0 text-subtle"><i className="fa fa-times-circle" /></h5>
						</div>
					</div>
				</div>
			)}
			{filter.sortBy && (
				<div className="pill-wrapper">
					<span className="d-block">Ordenar por</span>
					<div className="pill padding-right-l">
						<h5 className="pill-content margin-0">
							{filter.sortBy === 'price-desc'
								? 'Precio Mayor - Menor'
								: filter.sortBy === 'price-asc'
									? 'Precio Menor - Mayor'
									: filter.sortBy === 'name-desc'
										? 'Nombre Z - A'
										: 'Nombre A - Z'
							}
						</h5>
						<div
							className="pill-remove"
							onClick={onRemoveSortFilter}
						>
							<h5 className="margin-0 text-subtle"><i className="fa fa-times-circle" /></h5>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

ProductAppliedFilters.propType = {
	filter: PropTypes.shape({
		brand: PropTypes.string,
		category: PropTypes.string,
		keyword: PropTypes.string,
		minPrice: PropTypes.number,
		maxPrice: PropTypes.number
	})
};

export default ProductAppliedFilters;
