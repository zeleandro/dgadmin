import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetFilter, applyFilter } from 'redux/actions/filterActions';
import { selectMax, selectMin } from 'selectors/selector';

import { getBrands } from 'redux/actions/brandActions';
import { getCategories } from 'redux/actions/categoryActions';

import PriceRange from './PriceRange';

const Filters = (props) => {
	const [isMounted, setMounted] = useState(false);
	const [field, setFilter] = useState({
		brand: props.filter.brand,
		category: props.filter.category,
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


	const brands = useSelector(state => state.brands.items)
	const categories = useSelector(state => state.categories.items)

	const fetchBrands = () => {
		dispatch(getBrands());
	};
	const fetchCategories = () => {
		dispatch(getCategories());
	};

	useEffect(() => {
		if (brands.length === 0) {
			fetchBrands();
		}
		if (categories.length === 0) {
			fetchCategories();
		}
	}, []);

	const onPriceChange = (min, max) => {
		setFilter({ ...field, minPrice: min, maxPrice: max });
	};

	const onBrandFilterChange = (e) => {
		const val = e.target.value;
		setFilter({ ...field, brand: val });
	};

	const onCategoryFilterChange = (e) => {
		const val = e.target.value;
		setFilter({ ...field, category: val });
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
		const filterFields = ['brand', 'category', 'minPrice', 'maxPrice', 'sortBy'];

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
							className="form-control select2-show-search border-bottom-0 select2-hidden-accessible"
							name="brand"
							className="filters-brand"
							value={field.brand}
							disabled={props.isLoading || props.productsCount === 0}
							onChange={onBrandFilterChange}
						>
							<option value="">Todas las marcas</option>
							{
								brands.map(item => (
									<option key={item.id} value={item.name.toLowerCase()}>{item.name}</option>
								))
							}
						</select>
					)}
			</div>
			<div className="filters-field">
				<span>Categoría</span>
				<br />
				<br />
				{props.productsCount === 0 && props.isLoading ? (
					<h5 className="text-subtle">Cargando filtros</h5>
				) : (
						<select
							name="category"
							className="filters-brand"
							value={field.category}
							disabled={props.isLoading || props.productsCount === 0}
							onChange={onCategoryFilterChange}
						>
							<option value="">Todas las categorías</option>
							{
								categories.map(item => (
									<option key={item.id} value={item.name.toLowerCase()}>{item.name}</option>
								))
							}
						</select>
					)}
			</div>
			<div className="filters-field">
				<span>Ordenar por</span>
				<br />
				<br />
				<select
					className="form-control select2-show-search border-bottom-0 select2-hidden-accessible"
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
					className="btn btn-success"
					disabled={props.isLoading || props.productsCount === 0}
					onClick={onApplyFilter}
				>
					Aplicar filtros
        		</button>
				<button
					className="btn btn-info"
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
