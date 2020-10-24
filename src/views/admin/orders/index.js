import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useDocumentTitle from 'hooks/useDocumentTitle';
import useScrollTop from 'hooks/useScrollTop';
import { selectFilter } from 'selectors/selector';
import OrderList from 'components/order/OrderList';
import Boundary from 'components/ui/Boundary';
import OrderItem from '../components/OrderItem';

const Orders = ({ history }) => {
	useDocumentTitle('DG Limpieza | Pedidos');
	useScrollTop();

	const store = useSelector(state => ({
		filter: state.filter,
		filteredOrders: selectFilter(state.orders.items, state.filter),
		requestStatus: state.app.requestStatus,
		isLoading: state.app.loading,
		orders: state.orders,
		ordersCount: state.orders.items.length,
		totalOrdersCount: state.orders.total
	}));

	// TODO insufficient permission
	// TODO fix filters modal
	return (
		<Boundary>
			<div className="product-admin-header">
				<h3 className="product-admin-header-title">
					Pedidos &nbsp;
					({`${store.ordersCount} / ${store.totalOrdersCount}`})
				</h3>
			</div>
			<div className="product-admin-items">
				<OrderList {...store}>
					{() => (
						<>
							{(
								<div className="grid grid-product grid-count-6">
									<div className="grid-col" />
									<div className="grid-col">
										<h5>Pedido</h5>
									</div>
									<div className="grid-col">
										<h5>Estado</h5>
									</div>
									<div className="grid-col">
										<h5>Fecha</h5>
									</div>
									<div className="grid-col">
										<h5>Cantidad</h5>
									</div>
									<div className="grid-col">
										<h5>Total</h5>
									</div>
								</div>
							)}
							{store.orders.length === 0 ? new Array(10).fill({}).map((order, index) => (
								<OrderItem
								key={`product-skeleton ${index}`}
								order={order}
							/>
							)) : store.orders.items.map(order => (
								<OrderItem
									key={order.id}
									order={order}
								/>
							))}
						</>
					)}
				</OrderList>
			</div>
		</Boundary>
	);
};

export default withRouter(Orders);
