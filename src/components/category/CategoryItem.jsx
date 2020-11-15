import React from 'react';
import PropTypes from 'prop-types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ImageLoader from '../ui/ImageLoader';

const CategoryItem = ({
	category,
	isItemOnBasket,
	isLoading
}) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const onClickItem = () => {
		if (isLoading) return;

		if (category.id) {
			history.push(`/products/${category.name}`);
		}
	};

	return (
		<div className="col-lg-3 col-md-12">
		<div className={`card ${!category.id ? 'product-loading' : ''}`}
		>
			<div className="card-body">
				<div className="product-item2-desc">
					<p>{category.name || <Skeleton width={60} />}</p>
				</div>

			</div>
			<div className="card-footer">
				<div className="product-item-wrap d-flex">
				<button className={`btn btn-info btn-lg mr-auto}`} onClick={onClickItem}>
						Ver Productos
						</button>					
				</div>
			</div>
		</div>
		</div>
		
		
	);
};

CategoryItem.propType = {
	category: PropTypes.object.isRequired
};

export default CategoryItem;
