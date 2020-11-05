import React, { useRef } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { EDIT_CATEGORY } from 'constants/routes';

const CategoryItem = ({ category, history }) => {
	const dispatch = useDispatch();
	const categoryRef = useRef(null);

	const onClickEdit = () => {
		history.push(`${EDIT_CATEGORY}/${category.id}`);
	};

	return (
		<SkeletonTheme
			color="#e1e1e1"
			highlightColor="#f2f2f2"
		>
			<div
				className={`item item-products ${!category.id && 'item-loading'}`}
				ref={categoryRef}
			>
				<div className="grid grid-count-6">
					<div className="grid-col">
						<span className="text-overflow-ellipsis">{category.name || <Skeleton width={50} />}</span>
					</div>
				</div>
				{category.id && (
					<div className="item-action">
						<button
							className="button button-buser button-small"
							onClick={onClickEdit}
						>
							Ver Categoría
						</button>
					</div>
				)}
			</div>
		</SkeletonTheme>
	);
};

CategoryItem.propTypes = {
	user: PropTypes.shape({
		id: PropTypes.string,
		user: PropTypes.string,
		date: PropTypes.string,
		email: PropTypes.string,
		address: PropTypes.string
	})
};

export default withRouter(CategoryItem);
