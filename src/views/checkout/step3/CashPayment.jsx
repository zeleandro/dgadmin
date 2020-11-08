import React from 'react';

const CashPayment = ({ paymentMode, onCashModeChange }) => {
	return (
		<div className={`checkout-fieldset-collapse ${paymentMode === 'cash' ? 'is-selected-payment' : ''}`}>
			<div className="checkout-field margin-0">
				<div className="checkout-checkbox-field">
					<input
						checked={paymentMode === 'cash'}
						className=""
						id="payment-cash-checkbox"
						name="checkout_payment"
						onChange={onCashModeChange}
						type="radio"
					/>
					<label
						className="d-flex w-100"
						htmlFor="payment-cash-checkbox"
					>
						<div className="d-flex-grow-1 margin-left-s">
							<h4 className="margin-0">Efectivo</h4>
							<span className="text-subtle d-block margin-top-s">
								Pago en efectivo en la entrega.
							</span>
						</div>
						<div className="fas fa-money-bill fa-3x" />
					</label>
				</div>
			</div>
		</div>
	);
};

export default CashPayment;