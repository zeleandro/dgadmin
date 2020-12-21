import React, { useState } from 'react';
import Input from 'components/ui/Input';

const ObservacionesForm = ({ setField, field }) => {

	const onObservacionesInput = (value, error) => {
		setField({ ...field, observaciones: { value, error } });
	};

	return (
		<div className="checkout-shipping-wrapper">
			<div className="checkout-shipping-form">
				<div className="checkout-fieldset">
					<div className="d-block checkout-field">
						<Input
							field="observaciones"
							isRequired
							label="Observaciones"
							maxLength={250}
							onInputChange={onObservacionesInput}
							placeholder="Alguna observacion?"
							style={{ textTransform: 'capitalize' }}
							type="textarea"
							value={field.observaciones.value}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ObservacionesForm;
