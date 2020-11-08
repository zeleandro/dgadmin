import React, { useRef } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { removeCategory } from 'redux/actions/categoryActions';
import { EDIT_CATEGORY } from 'constants/routes';
import { displayActionMessage } from 'helpers/utils';

const CategoryItem = ({ category, history }) => {
	const dispatch = useDispatch();
	const categoryRef = useRef(null);

	const onClickEdit = () => {
		history.push(`${EDIT_CATEGORY}/${category.id}`);
	};

	const onDeleteCategory = () => {
		categoryRef.current.classList.toggle('item-active');
	};

	const onConfirmDelete = () => {
		dispatch(removeCategory(category.id));
		displayActionMessage('Item successfully deleted');
		categoryRef.current.classList.remove('item-active');
	};

	const onCancelDelete = () => {
		categoryRef.current.classList.remove('item-active');
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
						<button
							className="button button-border button-small button-danger"
							onClick={onDeleteCategory}
						>
							Borrar
						</button>
						<div className="item-action-confirm">
							<h5>Confirma que desea eliminar la categoría?</h5>
							<button
								className="button button-small button-border"
								onClick={onCancelDelete}
							>
								No
							</button>
							&nbsp;
							<button
								className="button button-small button-danger"
								onClick={onConfirmDelete}
							>
								Si
							</button>
						</div>
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
