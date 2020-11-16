import React from 'react';
import { useSelector } from 'react-redux';
import SearchBar from './SearchBar';
import FiltersToggle from './FiltersToggle';
import { HOME } from 'constants/routes';
import { useHistory, useLocation, NavLink, Link } from 'react-router-dom';

const Banner = () => {
    const { pathname } = useLocation();
    const history = useHistory();
    const store = useSelector(state => ({
		filter: state.filter,
		products: state.products.items,
		basketLength: state.basket.length,
		profile: state.profile,
		isLoading: state.app.loading,
		isAuthenticating: state.app.isAuthenticating,
		productsLength: state.products.items.length
	}));

	return pathname !== HOME ? null : (
		<div>
			<div className="banner-1 cover-image sptb-2 bg-background serings" data-image-src="../assets/images/banners/auction.jpg" >
				<div className="header-text1 mb-0">
					<div className="container">
						<div className="row">
							<div className="col-xl-8 col-lg-12 col-md-12 d-block mx-auto">
								<div className="text-center text-white ">
									<h1 className="">DG Limpieza</h1>
								</div>
								
                                <>
                                <div className="form row no-gutters">
                                    <div className="form-group col-xl-6 col-lg-5 col-md-12 mb-0">
                                    <SearchBar
                                        isLoading={store.isLoading}
                                        filter={store.filter}
                                        history={history}
                                        productsLength={store.productsLength}
                                    />
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-12 mb-0">
                                    <FiltersToggle
                                        filter={store.filter}
                                        isLoading={store.isLoading}
                                        products={store.products}
                                        productsLength={store.productsLength}
                                        history={history}
                                    >
                                        <button className="btn btn-lg btn-block btn-secondary">
                                            Mas Filtros &nbsp;<i className="fa fa-chevron-right" />
                                        </button>
                                    </FiltersToggle>

                                    </div></div>
                                </>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Banner;