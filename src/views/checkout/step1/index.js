import React from 'react';

import useDocumentTitle from 'hooks/useDocumentTitle';
import useScrollTop from 'hooks/useScrollTop';
import { CHECKOUT_STEP_2 } from 'constants/routes';
import { displayMoney } from 'helpers/utils';
import BasketItem from 'components/basket/BasketItem';
import StepTracker from '../components/StepTracker';
import Pagination from '../components/Pagination';
import withAuth from '../hoc/withAuth';

const OrderSummary = ({
	basket,
	subtotal,
	dispatch,
	history
}) => {
	useDocumentTitle('DG Limpieza | Check Out Paso 1');
	useScrollTop();

	const onClickPrevious = () => history.push('/');
	const onClickNext = () => history.push(CHECKOUT_STEP_2);

	return (
		<div className="checkout">
			<StepTracker current={1} />
			<div className="checkout-step-1">
				<h3 className="text-center">Resumen del pedido</h3>
				<span className="d-block text-center">Controle los productos en su carrito</span>
				<br />
				<div className="checkout-items">
					{basket.map(product => (
						<BasketItem
							basket={basket}
							dispatch={dispatch}
							key={product.id}
							product={product}
						/>
					))}
				</div>
				<br />
				<div className="basket-total text-right">
					<p className="basket-total-title">Subtotal:</p>
					<h2 className="basket-total-amount">{displayMoney(subtotal)}</h2>
				</div>
				<br />
				<Pagination
					disabledNext={false}
					history={history}
					onClickNext={onClickNext}
					onClickPrevious={onClickPrevious}
					previousLabel="Continuar comprando"

				/>
			</div>
		</div>
	);
};

export default withAuth(OrderSummary);
