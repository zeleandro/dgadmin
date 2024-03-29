import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { CHECKOUT_STEP_1 } from 'constants/routes';
import { clearBasket } from 'redux/actions/basketActions';
import { displayMoney } from 'helpers/utils';
import BasketItem from './BasketItem';
import BasketToggle from './BasketToggle';
import Modal from '../ui/Modal';
import Boundary from '../ui/Boundary';

const Basket = (props) => {
	const [isModalOpen, setModalOpen] = useState(false);
	const basket = useSelector(state => state.basket);
	const history = useHistory();
	const { pathname } = useLocation();
	const dispatch = useDispatch();

	const calculateTotal = () => {
		let total = 0;

		if (basket.length !== 0) {
			const result = basket.map(product => product.price * product.quantity).reduce((a, b) => a + b);
			total = result.toFixed(2);
		}

		return displayMoney(total);
	};

	const onOpenModal = () => setModalOpen(true);
	const onCloseModal = () => setModalOpen(false);

	const onCheckOut = () => {
		if ((basket.length !== 0 && props.isAuth)) {
			document.body.classList.remove('is-basket-open');
			history.push(CHECKOUT_STEP_1);
		} else {
			onOpenModal();
		}
	};

	const onSignInClick = () => {
		onCloseModal();
		document.body.classList.remove('basket-open');
		history.push(CHECKOUT_STEP_1);
	};

	const onClearBasket = () => {
		if (basket.length !== 0) {
			dispatch(clearBasket());
		}
	};

	return (
		<Boundary>
			<Modal
				isOpen={isModalOpen}
				onRequestClose={onCloseModal}
			>
				<p className="text-center">Debes estar logueado para continuar</p>
				<br />
				<div className="d-flex-center">
					<button
						className="button button-border button-border-gray button-small"
						onClick={onCloseModal}
					>
						Continuar comprando
					</button>
					&nbsp;
					<button
						className="button button-small"
						onClick={onSignInClick}
					>
						Ingresar para continuar
					</button>
				</div>
			</Modal>
			<div className="basket">
				<div className="basket-list">
					<div className="basket-header">
						<h3 className="basket-header-title">
							Mi Carrito &nbsp;
							<span>({` ${basket.length} ${basket.length > 1 ? 'items' : 'item'}`})</span>
						</h3>
						<BasketToggle>
							{({ onClickToggle }) => (
								<span
									className="basket-toggle button button-border button-border-gray button-small"
									onClick={onClickToggle}
								>
									Seguir Comprando
								</span>
							)}
						</BasketToggle>
						<button
							className="basket-clear button button-border button-border-gray button-small"
							disabled={basket.length === 0}
							onClick={onClearBasket}
						>
							<span>Vaciar carrito</span>
						</button>
					</div>
					{basket.length <= 0 && (
						<div className="basket-empty">
							<h5 className="basket-empty-msg">Tu carrito está vacío</h5>
						</div>
					)}
					{basket.map((product, i) => (
						<BasketItem
							key={`${product.id}_${i}`}
							product={product}
							basket={basket}
							dispatch={dispatch}
						/>
					))}
					{/* <div className="basket-total">
						<p className="basket-total-title">Subtotal General:</p>
						<h2 className="basket-total-amount">{calculateTotal()}</h2>
					</div> */}
				</div>
				<div className="basket-checkout">
					<button
						className="btn btn-info btn-lg mr-auto "
						disabled={basket.length === 0 || pathname === '/checkout'}
						onClick={onCheckOut}
					>
						Comprar
					</button>
				</div>
			</div>
		</Boundary>
	);
};

export default Basket;
