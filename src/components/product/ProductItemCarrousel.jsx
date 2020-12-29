import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeFromBasket, addToBasket } from 'redux/actions/basketActions';
import { displayMoney, displayActionMessage } from 'helpers/utils';
import ImageLoader from '../ui/ImageLoader';

const ProductItemCorrousel = ({
	product,
	isItemOnBasket,
	isLoading
}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [cantidad, setCantidad] = useState(1)

	const onClickItem = () => {
		if (isLoading) return;

		if (product.id) {
			history.push(`/product/${product.id}`);
		}
	};

	const onAddToBasket = () => {
		if (isItemOnBasket) {
			dispatch(removeFromBasket(product.id));
			displayActionMessage('Se eliminó el producto del carrito', 'info');
		} else {
			product.quantity = cantidad;
			dispatch(addToBasket(product));
			displayActionMessage('Se agregó el producto al carrito', 'success');
		}
	};

	const onChange = (e) => {
		switch (e.target.name) {
			case 'cantidad': {
				setCantidad(e.target.value)
			}
			default: { }
		}
	}

	return (
		<div className="col-lg-11 col-md-12">
			<div className={`card card-carru ${!product.id ? 'product-loading' : ''}`}
				style={{
                    
					border: isItemOnBasket ? '1px solid #cacaca' : '',
					boxShadow: isItemOnBasket ? '0 10px 15px rgba(0, 0, 0, .07)' : 'none'
				}}
			>
				{
					(product.onSale == true)
						? <div className="arrow-ribbon-2 bg-primary">
							Oferta
					</div>
						: <div></div>
				}
				{isItemOnBasket && <i className="fa fa-check product-card-check" />}
				<div className="product-card-img-wrapper" onClick={onClickItem}>
					{product.image ? (
						<ImageLoader
							className="product-card-img"
							src={product.image}
						/>
					) : <Skeleton width={'100%'} height={'90%'} />}
				</div>
				<div className="card-body">
					<div className="product-item2-desc">
						<h4 className="font-weight-semibold text-dark">{product.brand || <Skeleton width={80} />}</h4>
						<p>{product.name || <Skeleton width={60} />}</p>
					</div>

				</div>

				
				<div className="card-footer">

					<div className="product-item-wrap d-flex">

						<button className={`btn btn-info btn-lg mr-auto ${isItemOnBasket ? 'btn btn-danger btn-lg mr-auto' : ''}`} onClick={onAddToBasket}>
							{isItemOnBasket ? 'Quitar del carrito' : 'Agregar al carrito'}
						</button>
						{
							(product.regularPrice) 
							? <div className="product-item-price">
								&nbsp;
								<span className="h2 text-muted"><del>${product.regularPrice}</del></span>
								&nbsp;
							</div>
							: ''
						}
						<div className="product-item-price">
							<span className="newprice text-dark">${product.price}</span>
						</div>
					</div>
				</div>
			</div>
		</div>


	);
};

ProductItemCorrousel.propType = {
	product: PropTypes.object.isRequired,
	isItemOnBasket: PropTypes.bool
};

export default ProductItemCorrousel;