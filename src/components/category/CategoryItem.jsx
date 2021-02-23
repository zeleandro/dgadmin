import React from 'react';
import PropTypes from 'prop-types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { useHistory , Link} from 'react-router-dom';
import ImageLoader from '../ui/ImageLoader';
import img from '../../../static/j1.png'

const CategoryItem = ({
	category,
	isItemOnBasket,
	isLoading
}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	// const onClickItem = () => {
	// 	if (isLoading) return;

	// 	if (category.id) {
	// 		history.push(`/products/${category.name}`);
	// 	}
	// };

	return (
		<div className="col-xl-3 col-lg-4 col-md-6">
			<div className={`item-all-card text-dark text-center p-4 bg-white ${!category.id ? 'product-loading' : ''}`}>
				<Link to={{
				pathname: `/products/${category.name}`,
				}} />
				<div className="item-all-text">
					<h3 className="mb-0 text-body font-weight-bold">{category.name}</h3>
				</div>
			</div>
			
		</div>
		
		
		
	);
};

CategoryItem.propType = {
	category: PropTypes.object.isRequired
};

export default CategoryItem;
