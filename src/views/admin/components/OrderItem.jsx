import React, { useRef } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import ImageLoader from 'components/ui/ImageLoader';
import { displayMoney, displayDate, displayActionMessage } from 'helpers/utils';

const OrderItem = ({ order, history }) => {
	const dispatch = useDispatch();
	const orderRef = useRef(null);

	const onClickEdit = () => {

	};

	const calculateTotal = (order) => {
		let total = 0;
		order.basket.map((item) => {
			total += item.price * item.quantity;
		})
		return total;
	}

	const sumProducts = (order) => {
		let total = 0;
		order.basket.map((item) => {
			total += item.quantity;
		})
		return total;
	}

	return (
		<SkeletonTheme
			color="#e1e1e1"
			highlightColor="#f2f2f2"
		>
			<div
				className={`item item-products ${!order.id && 'item-loading'}`}
				ref={orderRef}
			>
				<div className="grid grid-count-6">
					<div className="grid-col item-img-wrapper">
						{order.userImage ? (
							<ImageLoader
								alt={order.userImage}
								className="item-img"
								src={order.userImage}
							/>
						) :
							<Skeleton width={50} height={30} />
						}
					</div>
					<div className="grid-col">
						<span className="text-overflow-ellipsis">{order.user || <Skeleton width={50} />}</span>
					</div>
					<div className="grid-col">
						<span>{order.status || <Skeleton width={50} />}</span>
					</div>
					<div className="grid-col">
						<span>{order.date ? displayDate(order.date) : <Skeleton width={30} />}</span>
					</div>
					<div className="grid-col">
						<span>{sumProducts(order) || <Skeleton width={30} />}</span>
					</div>
					<div className="grid-col">
						<span>{calculateTotal(order) || <Skeleton width={20} />}</span>
					</div>
				</div>
				{order.id && (
					<div className="item-action">
						<button
							className="button button-border button-small"
							onClick={onClickEdit}
						>
							Ver Pedido
						</button>
					</div>
				)}
			</div>
		</SkeletonTheme>
	);
};

OrderItem.propTypes = {
	order: PropTypes.shape({
		id: PropTypes.string,
		user: PropTypes.string,
		date: PropTypes.number,
		email: PropTypes.string,
		address: PropTypes.string
	})
};

export default withRouter(OrderItem);
