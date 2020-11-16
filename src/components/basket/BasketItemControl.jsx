import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { addQtyItem, minusQtyItem } from 'redux/actions/basketActions';

const BasketItemControl = ({ product, dispatch }) => {
	 const onAddQty = () => {
		
			setQuantity(parseInt(quantity)+1);
			dispatch(addQtyItem({id: product.id, quantity}))
		
	 };

	 const onMinusQty = () => {
	 	if (product.quantity !== 0) {
			setQuantity(quantity-1)
			dispatch(addQtyItem({id: product.id, quantity}))
	 	}
	 };

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
		<React.Fragment>
		<div className="basket-item-control">
			{/*<button
				className="button button-border button-border-gray button-small basket-control basket-control-add"
				
				onClick={onAddQty}
			>
				+
			</button>
			<button
				className="button button-border button-border-gray button-small basket-control basket-control-minus"
				
				onClick={onMinusQty}
			>
				-
			</button>*/}
			
			
		</div>
			<input type="number" className="form-control h-5 input-basket" name="quantity" value={quantity}
			onChange={onChange}></input>
			</React.Fragment>)
};

BasketItemControl.propType = {
	action: PropTypes.objectOf(PropTypes.func).isRequired,
	product: PropTypes.object.isRequired
};

export default BasketItemControl;
