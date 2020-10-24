/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-sort-props */
import React, { useEffect, useState } from 'react';
import PropTypes, { object } from 'prop-types';
import { useDispatch } from 'react-redux';

import { getOrders } from 'redux/actions/orderActions';
import { setLoading } from 'redux/actions/miscActions';
import MessageDisplay from '../ui/MessageDisplay';

const OrderList = (props) => {
	const [isFetching, setFetching] = useState(false);

	const dispatch = useDispatch();
	const fetchOrders = () => {
		setFetching(true);
		dispatch(getOrders(props.lastRefKey));
	};

	useEffect(() => {
		if (props.ordersCount === 0) {
			fetchOrders();
		}

		window.scrollTo(0, 0);
		return () => dispatch(setLoading(false));
	}, []);

	useEffect(() => {
		setFetching(false);
	}, [props.lastRefKey]);

	const order = id => props.orders.find(item => item.id === id);

	return props.filteredOrders.length === 0 && !props.isLoading && !props.requestStatus ? (
		<MessageDisplay
			message="No se encontraron pedidos"
			desc="Pruebe usando filtros o palabras claves"
		/>
	) : props.requestStatus ? (
		<MessageDisplay
			message={props.requestStatus}
			action={fetchOrders}
			buttonLabel="Intentar nuevamente"
		/>
	) : (
				<>
					{props.children({ order })}
					{props.ordersCount < props.totalOrdersCount && (
						<div className="d-flex-center padding-l">
							<button
								className="button button-small"
								disabled={isFetching}
								onClick={fetchOrders}
							>
								{isFetching ? 'Buscando pedidos...' : 'Mostrar mas pedidos'}
							</button>
						</div>
					)}
				</>
			);
};

OrderList.propType = {
	filter: PropTypes.object,
	basket: PropTypes.arrayOf(object),
	filteredOrders: PropTypes.arrayOf(PropTypes.object),
	orders: PropTypes.arrayOf(object),
	isLoading: PropTypes.bool.isRequired,
	requestStatus: PropTypes.string.isRequired,
	ordersCount: PropTypes.number.isRequired,
	totalOrdersCount: PropTypes.number.isRequired,
	filteredOrdersLength: PropTypes.number.isRequired,
};

export default OrderList;
