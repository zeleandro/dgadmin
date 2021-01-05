import React from 'react';

const MPPayment = ({ paymentMode, onMpModeChange }) => {
	return (
		<div className={`checkout-fieldset-collapse ${paymentMode === 'mp' ? 'is-selected-payment' : ''}`}>
			<div className="checkout-field margin-0">
				<div className="checkout-checkbox-field">
					<input
						checked={paymentMode === 'mp'}
						className=""
						id="payment-mp-checkbox"
						name="checkout_payment"
						onChange={onMpModeChange}
						type="radio"
					/>
					<label
						className="d-flex w-100"
						htmlFor="payment-mp-checkbox"
					>
						<div className="d-flex-grow-1 margin-left-s">
							<h4 className="margin-0">Mercado Pago</h4>
							<span className="text-subtle d-block margin-top-s">
								Envío de dinero con Mercado Pago.
							</span>
						</div>
						<div className="fas fa-comments-dollar fa-3x" />
					</label>
				</div>
			</div>
		</div>
	);
};

export default MPPayment;