/* eslint-disable no-nested-ternary */
import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { applyFilter } from 'redux/actions/filterActions';

const OrderAppliedFilters = ({ filter }) => {
    const dispatch = useDispatch();
    const fields = ['status', 'user', 'sortBy', 'keyword'];

    const onRemoveKeywordFilter = () => {
        dispatch(applyFilter({ keyword: '' }));
    };

    const onRemoveStatusFilter = () => {
        dispatch(applyFilter({ status: '' }));
    };

    const onRemoveUserFilter = () => {
        dispatch(applyFilter({ status: '' }));
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
            {filter.status && (
                <div className="pill-wrapper">
                    <span className="d-block">Estado</span>
                    <div className="pill padding-right-l">
                        <h5 className="pill-content margin-0">{filter.status}</h5>
                        <div className="pill-remove" onClick={onRemoveStatusFilter}>
                            <h5 className="margin-0 text-subtle"><i className="fa fa-times-circle" /></h5>
                        </div>
                    </div>
                </div>
            )}
            {filter.user && (
                <div className="pill-wrapper">
                    <span className="d-block">Usuario</span>
                    <div className="pill padding-right-l">
                        <h5 className="pill-content margin-0">{filter.user}</h5>
                        <div className="pill-remove" onClick={onRemoveUserFilter}>
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

OrderAppliedFilters.propType = {
    filter: PropTypes.shape({
        status: PropTypes.string,
        user: PropTypes.string,
        keyword: PropTypes.string
    })
};

export default OrderAppliedFilters;
