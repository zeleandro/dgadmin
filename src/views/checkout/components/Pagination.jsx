import React from 'react';

const Pagination = ({
	nextStepLabel,
	previousLabel,
	disabledNext,
	onClickNext,
	onClickPrevious,
	previousVisible
}) => {
	return (
		<div className="checkout-shipping-action">
			{previousVisible && (
				<button
					className="btn btn-lg btn-secondary"
					onClick={onClickPrevious}
					type="button"
				>
					{previousLabel}
				</button>
			)}
			<button
				className="btn btn-lg btn-info"
				disabled={disabledNext}
				onClick={onClickNext}
			>
				{nextStepLabel}
			</button>
		</div>
	);
};

Pagination.defaultProps = {
	nextStepLabel: 'Siguiente',
	previousLabel: 'Atrás',
	previousVisible: true
};

export default Pagination;
