import React from 'react';
import PropTypes from 'prop-types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ImageLoader from '../ui/ImageLoader';
import img from '../../../static/j1.png'

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
		<div className="col-xl-3  col-md-12">
			<div className={`card ${!category.id ? 'product-loading' : ''}`}>
						<div className="item-card">
							<div className="item-card-desc">
								<a href="" onClick={onClickItem}></a>
								<div className="item-card-img">
									<img src={img} alt="img" className="br-tr-7 br-tl-7" />
								</div>
								<div className="item-card-text">
									<h4 className="mb-0">{category.name}</h4>
								</div>
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
