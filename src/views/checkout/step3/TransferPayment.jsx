import React from 'react';

const TransferPayment = ({ paymentMode, onTransferModeChange }) => {
	return (
		<div className={`checkout-fieldset-collapse ${paymentMode === 'transfer' ? 'is-selected-payment' : ''}`}>
			<div className="checkout-field margin-0">
				<div className="checkout-checkbox-field">
					<input
						checked={paymentMode === 'transfer'}
						className=""
						id="payment-transfer-checkbox"
						name="checkout_payment"
						onChange={onTransferModeChange}
						type="radio"
					/>
					<label
						className="d-flex w-100"
						htmlFor="payment-transfer-checkbox"
					>
						<div className="d-flex-grow-1 margin-left-s">
							<h4 className="margin-0">Transferencia</h4>
							<span className="text-subtle d-block margin-top-s">
								Pago por Transferencia Bancaria.
							</span>
						</div>
                        <div className="fas fa-university fa-3x" />
					</label>
				</div>
			</div>
		</div>
	);
};

export default TransferPayment;