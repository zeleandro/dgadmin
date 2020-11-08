import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useDocumentTitle from 'hooks/useDocumentTitle';
import useScrollTop from 'hooks/useScrollTop';

import { selectFilter } from 'selectors/selector';
import Boundary from 'components/ui/Boundary';

import BrandList from '../components/BrandList';
import BrandItem from '../components/BrandItem';

import { ADD_BRAND } from 'constants/routes';

const Brands = ({ history }) => {
	useDocumentTitle('DG Limpieza | Marcas');
	useScrollTop();

	const store = useSelector(state => ({
		filter: state.filter,
		filteredBrands: selectFilter(state.brands.items, state.filter),
		requestStatus: state.app.requestStatus,
		isLoading: state.app.loading,
		brands: state.brands,
		brandsCount: state.brands.items.length,
		totalBrandsCount: state.brands.total,
	}));

	const onClickAddBrand = () => {
		history.push(ADD_BRAND);
	};

	return (
		<Boundary>
			<div className="product-admin-header">
				<h3 className="product-admin-header-title">
					Marcas &nbsp;
					({`${store.brandsCount} / ${store.totalBrandsCount}`})
				</h3>
				&nbsp;
				<button
					className="button button-small"
					onClick={onClickAddBrand}
				>
					Nueva Marca
				</button>
			</div>
			<div className="product-admin-items">
				<BrandList {...store}>
					{() => (
						<>
							{/* <brandAppliedFilters filter={store.filter} /> */}
							{(
								<div className="grid grid-product grid-count-6">
									<div className="grid-col">
										<h5>Nombre</h5>
									</div>
								</div>
							)}
							{store.brands.length === 0 ? new Array(10).fill({}).map((brand, index) => (
								<BrandItem
									key={`product-skeleton ${index}`}
									brand={brand}
								/>
							)) : store.brands.items.map(brand => (
								<BrandItem
									key={brand.email}
									brand={brand}
								/>
							))}
						</>
					)}
				</BrandList>
			</div>
		</Boundary>
	);
};

export default withRouter(Brands);
