import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addQtyItem, minusQtyItem } from 'redux/actions/basketActions';

const BasketItemControl = ({ product, dispatch }) => {
	// const onAddQty = () => {
	// 	if (product.quantity < product.maxQuantity) {
	// 		dispatch(addQtyItem(product.id));
	// 	}
	// };

	// const onMinusQty = () => {
	// 	if ((product.maxQuantity >= product.quantity) && product.quantity !== 0) {
	// 		dispatch(minusQtyItem(product.id));
	// 	}
	// };

    const [quantity, setQuantity] = useState(product.quantity)
	const onChange = (e) => {
		switch (e.target.name) {
			case 'quantity': {
                setQuantity(e.target.value)
                dispatch(addQtyItem({id: product.id, quantity: e.target.value}))
            }
			default: { }
		}
    }

	return (
		<div className="basket-item-control">
			{/* <button
				className="button button-border button-border-gray button-small basket-control basket-control-add"
				disabled={product.maxQuantity === product.quantity}
				onClick={onAddQty}
			>
				+
			</button>
			<button
				className="button button-border button-border-gray button-small basket-control basket-control-minus"
				disabled={product.quantity === 1}
				onClick={onMinusQty}
			>
				-
			</button> */}
			<input type="text" class="form-control text-center h-5" name="quantity" value={quantity}
                onChange={onChange}></input>
		</div>
	);
};

BasketItemControl.propType = {
	action: PropTypes.objectOf(PropTypes.func).isRequired,
	product: PropTypes.object.isRequired
};

export default BasketItemControl;
