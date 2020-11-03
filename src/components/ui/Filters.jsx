import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetFilter, applyFilter } from 'redux/actions/filterActions';
import { selectMax, selectMin } from 'selectors/selector';

import PriceRange from './PriceRange';

const Filters = (props) => {
	const [isMounted, setMounted] = useState(false);
	const [field, setFilter] = useState({
		brand: props.filter.brand,
		minPrice: props.filter.minPrice,
		maxPrice: props.filter.maxPrice,
		sortBy: props.filter.sortBy
	});
	const dispatch = useDispatch();
	const max = selectMax(props.products);
	const min = selectMin(props.products);

	useEffect(() => {
		if (isMounted && window.screen.width <= 480) {
			props.history.push('/');
		}

		if (isMounted && props.closeModal) props.closeModal();

		setFilter(props.filter);
		setMounted(true);
		window.scrollTo(0, 0);
	}, [props.filter]);


	const onPriceChange = (min, max) => {
		setFilter({ ...field, minPrice: min, maxPrice: max });
	};

	const onBrandFilterChange = (e) => {
		const val = e.target.value;

		setFilter({ ...field, brand: val });
	};

	const onSortFilterChange = (e) => {
		setFilter({ ...field, sortBy: e.target.value });
	};


	const onApplyFilter = () => {
		const isChanged = Object.keys(field).some(key => field[key] !== props.filter[key]);

		if (field.minPrice > field.maxPrice) {
			return false;
		}

		if (isChanged) {
			dispatch(applyFilter(field));
		} else {
			props.closeModal();
		}
	};

	const onResetFilter = () => {
		const filterFields = ['brand', 'minPrice', 'maxPrice', 'sortBy'];

		if (filterFields.some(key => !!props.filter[key])) {
			dispatch(resetFilter());
		} else {
			props.closeModal();
		}
	};

	return (
		<div className="filters">
			<div className="filters-field">
				<span>Marca</span>
				<br />
				<br />
				{props.productsCount === 0 && props.isLoading ? (
					<h5 className="text-subtle">Cargando filtros</h5>
				) : (
						<select
							className="filters-brand"
							value={field.brand}
							disabled={props.isLoading || props.productsCount === 0}
							onChange={onBrandFilterChange}
						>
							<option value="">Todas las marcas</option>
							<option value="dgclean">DGClean</option>
							<option value="generica">Generica</option>
							<option value="marca">Marca</option>
							<option value="otramarca">Otra Marca</option>
						</select>
					)}
			</div>
			<div className="filters-field">
				<span>Ordenar por</span>
				<br />
				<br />
				<select
					className="filters-sort-by d-block"
					value={field.sortBy}
					disabled={props.isLoading || props.productsCount === 0}
					onChange={onSortFilterChange}
				>
					<option value="">Nada</option>
					<option value="name-asc">Nombre Ascendente A - Z</option>
					<option value="name-desc">Nombre Descendente Z - A</option>
					<option value="price-desc">Precio Mayor - Menor</option>
					<option value="price-asc">Precio Menor - Mayor</option>
				</select>
			</div>
			<div className="filters-field">
				<span>Rango de Precios</span>
				<br />
				<br />
				{(props.productsCount === 0 && props.isLoading) || max === 0 ? (
					<h5 className="text-subtle">Cargando Filtros</h5>
				) : (
						<PriceRange
							min={min}
							max={max}
							initMin={field.minPrice}
							initMax={field.maxPrice}
							isLoading={props.isLoading}
							onPriceChange={onPriceChange}
							productsLength={props.productsCount}
						/>
					)}
			</div>
			<div className="filters-action">
				<button
					className="filters-button button button-small"
					disabled={props.isLoading || props.productsCount === 0}
					onClick={onApplyFilter}
				>
					Aplicar filtros
        </button>
				<button
					className="filters-button button button-border button-small"
					disabled={props.isLoading || props.productsCount === 0}
					onClick={onResetFilter}
				>
					Borrar filtros
        </button>
			</div>
		</div>
	);
};

export default withRouter(Filters);
