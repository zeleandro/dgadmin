import React, { Component, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from 'components/ui/CircularProgress';
import Input from 'components/ui/Input';
import PropTypes from 'prop-types';


const CategoryForm = ({ category, onSubmit, isLoading }) => {
    const defaultCategory = {
        ...category
    };
    const [field, setField] = useState({
        name: { value: category ? defaultCategory.name : '' }
    });
    const dispatch = useDispatch();

    const onSubmitForm = (e) => {
        e.preventDefault();

        const newCategory = {};

        Object.keys(field).forEach((i) => {
            newCategory[i] = field[i].value;
        });

        if (category) {
            newCategory.id = category.id
        }

        onSubmit({
            ...newCategory
        });

    };
    
    const onCategoryNameInput = (value, error) => {
        setField({ ...field, name: { value, error } });
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
                                label="* Nombre"
                                maxLength={60}
                                onInputChange={onCategoryNameInput}
                                placeholder="Nombre de la Categoría"
                                readOnly={isLoading}
                                style={{ textTransform: 'capitalize' }}
                                type="text"
                                value={field.name.value}
                            />
                        </div>
						&nbsp;
					</div>

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
                            {isLoading ? 'Actualizando' : 'Actualizar Categoría'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

CategoryForm.propTypes = {
    isLoading: PropTypes.bool,
    onSubmit: PropTypes.func,
    name: PropTypes.string,
};

export default CategoryForm;
