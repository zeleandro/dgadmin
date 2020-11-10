import React, { Component, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from 'components/ui/CircularProgress';
import Input from 'components/ui/Input';
import { displayMoney } from 'helpers/utils';
import PropTypes from 'prop-types';
import BasketItem from 'components/basket/BasketItem';

const OrderForm = ({ order, onSubmit, isLoading }) => {
	const defaultOrder = {
		...order
	};
	const [field, setField] = useState({
		user: { value: order ? defaultOrder.user : '' },
		date: { value: order ? defaultOrder.date : '' },
		total: { value: order ? defaultOrder.total : 0 },
		mobile: { value: order ? defaultOrder.mobile : '' },
		address: { value: order ? defaultOrder.address : '' },
		status: { value: order ? defaultOrder.status : [''] },
		email: { value: order ? defaultOrder.email : '' },
		paymentMode: { value: order ? defaultOrder.paymentMode : '' },
		basket: { value: order ? defaultOrder.basket : [] },
		comment: { value: order ? defaultOrder.comment : '' }
	});
	const dispatch = useDispatch();
	const profile = useSelector(state => state.profile);

	const onSubmitForm = (e) => {
		e.preventDefault();
		// eslint-disable-next-line no-extra-boolean-cast

		const newOrder = {};

		Object.keys(field).forEach((i) => {
			newOrder[i] = field[i].value;
		});

		defaultOrder.status = status;
		defaultOrder.paymentMode = paymentMode;
		defaultOrder.taxes = taxes;
		if (field.comment.value) {
			defaultOrder.comment = field.comment.value;
		}

		onSubmit({
			...defaultOrder,
			updatedBy: profile.fullname,
			dateUpdated: new Date().getTime()
		});

	};

	const [basket, setBasket] = useState([]);

	useEffect(() => {
		if (defaultOrder.basket && basket.length === 0) {
			for (const [id, data] of Object.entries(defaultOrder.basket))
				basket.push(data);
		}
		calculateTotal();
	});

	const [status, setStatus] = useState(defaultOrder.status)
	const [paymentMode, setPaymentMode] = useState(defaultOrder.paymentMode)
	const [total, setTotal] = useState(0)
	const [taxes, setTaxes] = useState(0)

	const onChange = (e) => {
		switch (e.target.name) {
			case 'status': {
				setStatus(e.target.value)
			}
			case 'paymentMode': {
				setPaymentMode(e.target.value)
			}
			default: { }
		}
	}

	const calculateTotal = () => {
		if (basket.length !== 0) {
			const result = basket.map(product => product.price * product.quantity).reduce((a, b) => a + b);
			setTotal(result.toFixed(2));
		}
		if (paymentMode !== 'cash') {
			setTaxes(total * 0.21)
		} else {
			setTaxes(0)
		}
	};

	const onOrderCommentInput = (value, error) => {
		setField({ ...field, comment: { value, error } });
	};

	return (
		<div>
			<form
				className="product-form"
				onSubmit={onSubmitForm}
			>
				<div class="container">
					<div class="invoice">
						<div class="invoice-company text-inverse f-w-600">
							{defaultOrder.user}
						</div>
						<div class="invoice-header">
							<div class="invoice-from">
								<address class="m-t-5 m-b-5">
									<strong class="text-inverse">{defaultOrder.address}</strong><br />
									{defaultOrder.mobile}<br />
									{defaultOrder.email}<br />
									{defaultOrder.date}
								</address>
							</div>
						</div>
						<div class="invoice-header">
							<Input
								field="comment"
								label="Observaciones"
								maxLength={60}
								placeholder="Comentarios"
								readOnly={isLoading}
								type="textarea"
								value={field.comment.value}
								onInputChange={onOrderCommentInput}
							/>
						</div>
					</div>
				</div>

				<div className="product-form-inputs">
					<div className="d-flex">
						<div className="product-form-field">
							<select
								name="status"
								className="filters-brand"
								value={status}
								onChange={onChange}
							>
								<option value="Pendiente">Pendiente</option>
								<option value="Entregado">Entregado</option>
								<option value="Cancelado">Cancelado</option>
							</select>
						</div>
						&nbsp;
						<div className="product-form-field">
							<select
								name="paymentMode"
								className="filters-paymentMode"
								value={paymentMode}
								onChange={onChange}
							>
								<option value="cash">Efectivo</option>
								<option value="card">Tarjeta</option>
								<option value="transfer">Transferencia</option>
							</select>
						</div>
						&nbsp;
					</div>
					<div className="product-admin-items">
						<>
							{
								basket.map(item => (
									<div
										key={item.id}
									>
										<BasketItem
											key={item.id}
											product={item}
											basket={basket}
											dispatch={dispatch}
										/>
									</div>
								))
							}
						</>
					</div>
					<br />
					<div className="basket-checkout">
						<div className="basket-total">
							<p className="basket-total-title">SubTotal:</p>
							<h3 className="basket-total-amount">{displayMoney(total)}</h3>
							<p className="basket-total-title">IVA:</p>
							<h3 className="basket-total-amount">{displayMoney(taxes)}</h3>
							<p className="basket-total-title">Total:</p>
							<h2 className="basket-total-amount">{displayMoney(parseFloat(total) + parseFloat(taxes))}</h2>
						</div>
					</div>

					<div className="product-form-field product-form-submit">
						<button
							className="button"
							disabled={isLoading}
							type="submit"
						>
							<CircularProgress
								theme="light"
								visible={isLoading}
							/>
							{isLoading ? 'Actualizando' : 'Actualizar Pedido'}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

OrderForm.propTypes = {
	isLoading: PropTypes.bool,
	onSubmit: PropTypes.func,
	order: PropTypes.shape({
		user: PropTypes.string,
		status: PropTypes.string,
		total: PropTypes.number,
		email: PropTypes.string,
		address: PropTypes.string,
		mobile: PropTypes.string,
		date: PropTypes.string,
		paymentMode: PropTypes.string,
		basket: PropTypes.arrayOf(PropTypes.object),
		comment: PropTypes.string,
	})
};

export default OrderForm;
