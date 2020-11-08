import React from 'react';

const CardPayment = ({ paymentMode, onCardModeChange }) => {
    return (
        <div className={`checkout-fieldset-collapse ${paymentMode === 'card' ? 'is-selected-payment' : ''}`}>
            <div className="checkout-field margin-0">
                <div className="checkout-checkbox-field">
                    <input
                        checked={paymentMode === 'card'}
                        className=""
                        id="payment-card-checkbox"
                        name="checkout_payment"
                        onChange={onCardModeChange}
                        type="radio"
                    />
                    <label
                        className="d-flex w-100"
                        htmlFor="payment-card-checkbox"
                    >
                        <div className="d-flex-grow-1 margin-left-s">
                            <h4 className="margin-0">Tarjeta</h4>
                            <span className="text-subtle d-block margin-top-s">
                                Pago con Tarjeta de Crédito o Débito.
							</span>
                        </div>
                        <div className="d-flex">
                            <div className="payment-img payment-img-visa" />
								&nbsp;
								<div className="payment-img payment-img-mastercard" />
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default CardPayment;