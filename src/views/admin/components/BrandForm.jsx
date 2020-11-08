import React, { Component, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from 'components/ui/CircularProgress';
import Input from 'components/ui/Input';
import PropTypes from 'prop-types';


const BrandForm = ({ brand, onSubmit, isLoading }) => {
    const defaultBrand = {
        ...brand
    };
    const [field, setField] = useState({
        name: { value: brand ? defaultBrand.name : '' }
    });
    const dispatch = useDispatch();

    const onSubmitForm = (e) => {
        e.preventDefault();

        const newBrand = {};

        Object.keys(field).forEach((i) => {
            newBrand[i] = field[i].value;
        });

        if (brand) {
            newBrand.id = brand.id
        }

        onSubmit({
            ...newBrand
        });

    };
    
    const onBrandNameInput = (value, error) => {
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
                                onInputChange={onBrandNameInput}
                                placeholder="Nombre de la Marca"
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
                            {isLoading ? 'Actualizando' : 'Actualizar Marca'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

BrandForm.propTypes = {
    isLoading: PropTypes.bool,
    onSubmit: PropTypes.func,
    name: PropTypes.string
};

export default BrandForm;
