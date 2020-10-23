import React, { useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CHECKOUT_STEP_2 } from 'constants/routes';
import useDocumentTitle from 'hooks/useDocumentTitle';
import useScrollTop from 'hooks/useScrollTop';
import { setPaymentDetails } from 'redux/actions/checkoutActions';
import { displayMoney, displayActionMessage } from 'helpers/utils';
import StepTracker from '../components/StepTracker';
import Pagination from '../components/Pagination';
import CreditPayment from './CreditPayment';
import PayPalPayment from './PayPalPayment';
import CashPayment from './CashPayment';
import withAuth from '../hoc/withAuth';
import { addOrder } from 'redux/actions/orderActions';
import { clearBasket } from 'redux/actions/basketActions';
import { stringify } from 'uuid';

const Payment = ({
	shipping,
	payment,
	subtotal,
	dispatch,
	history
}) => {
	useDocumentTitle('DG Limpieza | Check Out Paso 3');
	useScrollTop();

	const [paymentMode, setPaymentMode] = useState(payment.type || 'cash');
	const collapseCreditHeight = useRef(null);
	const cardInputRef = useRef(null);
	const [field, setField] = useState({
		name: { value: payment.data.name ? payment.data.name : '' },
		cardnumber: { value: payment.data.cardnumber ? payment.data.cardnumber : '' },
		expiry: { value: payment.data.expiry ? payment.data.expiry : '' },
		ccv: { value: payment.data.ccv ? payment.data.ccv : '' }
	});

	//Cargar desde Redux
	const basket = useSelector(state => state.basket);
	const checkout = useSelector(state => state.checkout);
	const profile = useSelector(state => state.profile);

	const onCreditModeChange = (e) => {
		setPaymentMode('credit');
		const parent = e.target.closest('.checkout-fieldset-collapse');
		const checkBoxContainer = e.target.closest('.checkout-checkbox-field');

		cardInputRef.current.focus();
		parent.style.height = `${checkBoxContainer.offsetHeight + collapseCreditHeight.current.offsetHeight}px`;
	};

	const onPayPalModeChange = () => {
		setPaymentMode('paypal');
		collapseCreditHeight.current.parentElement.style.height = '97px';
	};

	const onCashModeChange = () => {
		setPaymentMode('cash');
		collapseCreditHeight.current.parentElement.style.height = '97px';
	};

	const savePaymentDetails = () => {
		const isChanged = Object.keys(field).some(key => field[key].value !== payment.data[key]) || paymentMode !== payment.type;

		if (isChanged) {
			dispatch(setPaymentDetails({
				type: paymentMode,
				data: {
					type: paymentMode,
					name: field.name.value,
					cardnumber: field.cardnumber.value,
					expiry: field.expiry.value,
					ccv: field.ccv.value
				}
			}));
		}
	};

	const onConfirm = (e) => {
		e.preventDefault();
		// eslint-disable-next-line no-extra-boolean-cast

		if (!paymentMode) return;
		if (paymentMode === 'cash') {
			displayActionMessage('Se ha registrado su pedido :)', 'info');
			// TODO: fire only if changed
			savePaymentDetails();
			// Do some action here. :)

			const order = {
				user: profile.fullname,
				email: profile.email,
				date: new Date().toISOString(),
				paymentMode,
				address: checkout.shipping.address,
				mobile: checkout.shipping.mobile.value,
				status: 'Pendiente',
				basket
			}
			dispatch(addOrder(order));
			dispatch(clearBasket());

		} else {
			displayActionMessage('Debe seleccionar una forma de pago :)', 'info');
		}
	};

	const onClickBack = () => {
		savePaymentDetails();
		history.push(CHECKOUT_STEP_2);
	};

	return !shipping.isDone ? <Redirect to="/checkout/step1" />
		: (
			<div className="checkout">
				<StepTracker current={3} />
				<div className="checkout-step-3">
					<h3 className="text-center">Forma de Pago</h3>
					<br />
					<span className="d-block padding-s">Opciones de pago</span>
					<CashPayment
						onCashModeChange={onCashModeChange}
						paymentMode={paymentMode}
					/>
					{/* <CreditPayment
						field={field}
						onCreditModeChange={onCreditModeChange}
						paymentMode={paymentMode}
						ref={{
							cardInputRef,
							collapseCreditHeight
						}}
						setField={setField}
					/>
					<PayPalPayment
						onPayPalModeChange={onPayPalModeChange}
						paymentMode={paymentMode}
					/> */}
					<br />
					<div className="basket-total text-right">
						<p className="basket-total-title">Total:</p>
						<h2 className="basket-total-amount">{displayMoney(subtotal + (shipping.isInternational ? 50 : 0))}</h2>
					</div>
					<br />
					<Pagination
						// eslint-disable-next-line no-extra-boolean-cast
						disabledNext={!!!paymentMode}
						history={history}
						nextStepLabel="Confirm"
						onClickNext={onConfirm}
						onClickPrevious={onClickBack}

					/>
				</div>
			</div>
		);
};

export default withAuth(Payment);
