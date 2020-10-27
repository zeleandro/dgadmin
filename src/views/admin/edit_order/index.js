import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import useDocumentTitle from 'hooks/useDocumentTitle';
import useScrollTop from 'hooks/useScrollTop';
import { editOrder } from 'redux/actions/orderActions';
import OrderForm from '../components/OrderForm';

const EditOrder = (props) => {
	useDocumentTitle('DG Limpieza | Detalle del Pedido');
	useScrollTop();
	const { order, isLoading } = useSelector(state => ({
		order: state.orders.items.find(item => item.id === props.match.params.id),
		isLoading: state.app.loading
	}));
	const dispatch = useDispatch();

	const onSubmitForm = (updates) => {
		dispatch(editOrder(updates));
    };

    // console.log(order);

	return (
		<div className="product-form-container">
			{!order && <Redirect to="/dashboard/orders" />}
			<h2>Pedido</h2>
			<OrderForm
				isLoading={isLoading}
				onSubmit={onSubmitForm}
				order={order}
			/>
		</div>
	);
};

export default withRouter(EditOrder);
