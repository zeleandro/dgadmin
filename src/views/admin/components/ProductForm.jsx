import React, { useEffect, useState } from 'react';
import CircularProgress from 'components/ui/CircularProgress';
import ImageLoader from 'components/ui/ImageLoader';
import Input from 'components/ui/Input';

import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from 'redux/actions/brandActions';
import { getCategories } from 'redux/actions/categoryActions';

import useFileHandler from 'hooks/useFileHandler';
import PropTypes from 'prop-types';
// import uuid from 'uuid';

const ProductForm = ({ product, onSubmit, isLoading }) => {
	const defaultProduct = {
		imageCollection: [],
		...product
	};
	const [field, setField] = useState({
		name: { value: product ? defaultProduct.name : '' },
		brand: { value: product ? defaultProduct.brand : '' },
		category: { value: product ? defaultProduct.category : '' },
		price: { value: product ? defaultProduct.price : 0 },
		maxQuantity: { value: product ? defaultProduct.maxQuantity : 0 },
		description: { value: product ? defaultProduct.description : '' },
		keywords: { value: product ? defaultProduct.keywords : [''] },
		imageUrl: { value: product ? defaultProduct.image : '' },
		imageCollection: { value: product ? defaultProduct.imageCollection : [] }
	});

	const {
		imageFile,
		isFileLoading,
		onFileChange,
		removeImage
	} = useFileHandler({ image: {}, imageCollection: field.imageCollection.value });

	const brands = useSelector(state => state.brands.items)
	const categories = useSelector(state => state.categories.items)
	const dispatch = useDispatch();

	const fetchBrands = () => {
		dispatch(getBrands());
	};
	const fetchCategories = () => {
		dispatch(getCategories());
	};

	useEffect(() => {
		if (brands.length === 0) {
			fetchBrands();
		}
		if (categories.length === 0) {
			fetchCategories();
		}
	});

	const onChangeBrand = (e) => {
		switch (e.target.name) {
			case 'brand': {
				onProductBrandInput(e.target.value)
			}
			default: { }
		}
	}

	const onChangeCategory = (e) => {
		switch (e.target.name) {
			case 'category': {
				onProductCategoryInput(e.target.value)
			}
			default: { }
		}
	}

	const sanitizeNumber = (num) => {
		return Number(num.toString().replace(/^0*/, ''));
	};

	const onProductNameInput = (value, error) => {
		setField({ ...field, name: { value, error } });
	};

	const onProductBrandInput = (value, error) => {
		setField({ ...field, brand: { value, error } });
	};

	const onProductCategoryInput = (value, error) => {
		setField({ ...field, category: { value, error } });
	};

	const onProductPriceInput = (value, error) => {
		setField({ ...field, price: { value: sanitizeNumber(value), error } });
	};

	const onProductDescriptionInput = (value, error) => {
		setField({ ...field, description: { value, error } });
	};

	const onProductMaxQuantityInput = (value, error) => {
		setField({ ...field, maxQuantity: { value: sanitizeNumber(value), error } });
	};

	const onSubmitForm = (e) => {
		e.preventDefault();
		// eslint-disable-next-line no-extra-boolean-cast
		const noError = Object.keys(field).every(key => !!!field[key].error);

		if (field.name.value
			&& field.price.value
			// && field.maxQuantity.value
			&& (imageFile.image.file || field.imageUrl.value)
			&& noError
		) {
			const newProduct = {};

			Object.keys(field).forEach((i) => {
				newProduct[i] = field[i].value;
			});

			onSubmit({
				...newProduct,
				quantity: 1,
				dateAdded: new Date().getTime(),
				image: imageFile.image.file ? imageFile.image.file : field.imageUrl.value,
				imageCollection: imageFile.imageCollection
			});
		}
	};

	return (
		<div>
			<form
				className="product-form"
				onSubmit={onSubmitForm}
			>
				<div className="product-form-inputs">
					<div className="d-flex">
						<div className="product-form-field">
							<Input
								field="name"
								isRequired
								label="* Product Name"
								maxLength={60}
								onInputChange={onProductNameInput}
								placeholder="Nombre"
								readOnly={isLoading}
								style={{ textTransform: 'capitalize' }}
								type="text"
								value={field.name.value}
							/>
						</div>
						&nbsp;
						<div className="product-form-field">
							<select
								name="brand"
								className="filters-brand"
								value={field.brand.value}
								onChange={onChangeBrand}
							>
								{
									brands.map(item => (
										<option key={item.id} value={item.name}>{item.name}</option>
									))
								}
							</select>
						</div>
						<div className="product-form-field">
							<select
								name="category"
								className="filters-category"
								value={field.category.value}
								onChange={onChangeCategory}
							>
								{
									categories.map(item => (
										<option key={item.id} value={item.name}>{item.name}</option>
									))
								}
							</select>
						</div>
					</div>
					<div className="product-form-field product-textarea">
						<Input
							cols={37}
							field="description"
							isRequired={false}
							label="Product Description"
							maxLength={200}
							onInputChange={onProductDescriptionInput}
							placeholder="Nice Description"
							readOnly={isLoading}
							rows={5}
							type="textarea"
							value={field.description.value}
						/>
					</div>
					<div className="d-flex">
						<div className="product-form-field">
							<Input
								field="price"
								isRequired
								label="* Price"
								onInputChange={onProductPriceInput}
								placeholder="Product Price"
								readOnly={isLoading}
								type="number"
								value={field.price.value}
							/>
						</div>
						&nbsp;
						<div className="product-form-field">
							<Input
								field="maxQuantity"
								isRequired
								label="* Stock Total"
								onInputChange={onProductMaxQuantityInput}
								placeholder="Stock Total"
								readOnly={isLoading}
								type="number"
								value={field.maxQuantity.value}
							/>
						</div>
					</div>
					<div className="product-form-field">
						<span className="d-block padding-s">Image Collection</span>
						<input
							disabled={isLoading}
							hidden
							id="product-input-file-collection"
							multiple
							onChange={e => onFileChange(e, { name: 'imageCollection', type: 'multiple' })}
							readOnly={isLoading}
							type="file"
						/>
						{!isFileLoading && (
							<label htmlFor="product-input-file-collection">
								Choose Images
							</label>
						)}
					</div>
					<div className="product-form-collection">
						<>
							{imageFile.imageCollection.length >= 1 && (
								imageFile.imageCollection.map(image => (
									<div
										className="product-form-collection-image"
										key={image.id}
									>
										<ImageLoader
											alt=""
											src={image.url}
										/>
										<button
											className="product-form-delete-image"
											onClick={() => removeImage({ id: image.id, name: 'imageCollection' })}
											title="Delete Image"
											type="button"
										>
											<i className="fa fa-times-circle" />
										</button>
									</div>
								))
							)}
						</>
					</div>
					<br />
					<div className="product-form-field product-form-submit">
						<button
							className="button"
							disabled={isLoading}
							type="submit"
						>
							<CircularProgress
								theme="light"
								visible={isLoading}
							/>
							{isLoading ? 'Saving Product' : 'Save Product'}
						</button>
					</div>
				</div>
				<div className="product-form-file">
					<div className="product-form-field">
						<span className="d-block padding-s">* Thumbnail</span>
						<input
							disabled={isLoading}
							hidden
							id="product-input-file"
							onChange={e => onFileChange(e, { name: 'image', type: 'single' })}
							readOnly={isLoading}
							type="file"
						/>
						{!isFileLoading && (
							<label htmlFor="product-input-file">
								Choose Image
							</label>
						)}
					</div>
					<div className="product-form-image-wrapper">
						{(imageFile.image.url || field.imageUrl.value) && (
							<ImageLoader
								alt=""
								className="product-form-image-preview"
								src={imageFile.image.url || field.imageUrl.value}
							/>
						)}
					</div>
				</div>
			</form>
		</div>
	);
};

ProductForm.propTypes = {
	isLoading: PropTypes.bool,
	onSubmit: PropTypes.func,
	product: PropTypes.shape({
		name: PropTypes.string,
		brand: PropTypes.string,
		category: PropTypes.string,
		price: PropTypes.number,
		maxQuantity: PropTypes.number,
		description: PropTypes.string,
		keywords: PropTypes.arrayOf(PropTypes.string),
		image: PropTypes.string,
		imageCollection: PropTypes.arrayOf(PropTypes.object)
	})
};

export default ProductForm;
