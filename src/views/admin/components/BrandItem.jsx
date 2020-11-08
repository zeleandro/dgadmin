import React, { useRef } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { removeBrand } from 'redux/actions/brandActions';
import { EDIT_BRAND } from 'constants/routes';
import { displayActionMessage } from 'helpers/utils';

const BrandItem = ({ brand, history }) => {
    const dispatch = useDispatch();
    const brandRef = useRef(null);

    const onClickEdit = () => {
        history.push(`${EDIT_BRAND}/${brand.id}`);
    };

    const onDeleteBrand = () => {
		brandRef.current.classList.toggle('item-active');
    };
    
    const onConfirmDelete = () => {
		dispatch(removeBrand(brand.id));
		displayActionMessage('Item successfully deleted');
		brandRef.current.classList.remove('item-active');
	};

	const onCancelDelete = () => {
		brandRef.current.classList.remove('item-active');
	};

    return (
        <SkeletonTheme
            color="#e1e1e1"
            highlightColor="#f2f2f2"
        >
            <div
                className={`item item-products ${!brand.id && 'item-loading'}`}
                ref={brandRef}
            >
                <div className="grid grid-count-6">
                    <div className="grid-col">
                        <span className="text-overflow-ellipsis">{brand.name || <Skeleton width={50} />}</span>
                    </div>
                </div>
                {brand.id && (
                    <div className="item-action">
                        <button
                            className="button button-buser button-small"
                            onClick={onClickEdit}
                        >
                            Ver Marca
						</button>
                        <button
							className="button button-border button-small button-danger"
							onClick={onDeleteBrand}
						>
							Borrar
						</button>
                        <div className="item-action-confirm">
							<h5>Confirma que desea eliminar la marca?</h5>
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

BrandItem.propTypes = {
    name: PropTypes.string
};

export default withRouter(BrandItem);
