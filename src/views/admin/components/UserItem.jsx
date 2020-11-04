import React, { useRef } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import ImageLoader from 'components/ui/ImageLoader';
import { displayMoney, displayDate, displayActionMessage } from 'helpers/utils';
import { EDIT_USER } from 'constants/routes';

const UserItem = ({ user, history }) => {
	const dispatch = useDispatch();
	const userRef = useRef(null);

	const onClickEdit = () => {
		history.push(`${EDIT_USER}/${user.id}`);
	};

	return (
		<SkeletonTheme
			color="#e1e1e1"
			highlightColor="#f2f2f2"
		>
			<div
				className={`item item-products ${!user.id && 'item-loading'}`}
				ref={userRef}
			>
				<div className="grid grid-count-6">
					<div className="grid-col item-img-wrapper">
						{user.avatar ? (
							<ImageLoader
								alt={user.avatar}
								className="item-img"
								src={user.avatar}
							/>
						) :
							<Skeleton width={50} height={30} />
						}
					</div>
					<div className="grid-col">
						<span className="text-overflow-ellipsis">{user.fullname || <Skeleton width={50} />}</span>
					</div>
					<div className="grid-col">
						<span>{user.email || <Skeleton width={50} />}</span>
					</div>
					<div className="grid-col">
						<span>{user.address || <Skeleton width={30} />}</span>
					</div>
				</div>
				{user.id && (
					<div className="item-action">
						<button
							className="button button-buser button-small"
							onClick={onClickEdit}
						>
							Ver Usuario
						</button>
					</div>
				)}
			</div>
		</SkeletonTheme>
	);
};

UserItem.propTypes = {
	user: PropTypes.shape({
		id: PropTypes.string,
		user: PropTypes.string,
		date: PropTypes.string,
		email: PropTypes.string,
		address: PropTypes.string
	})
};

export default withRouter(UserItem);
