import React, { useEffect, useState } from 'react';
import CircularProgress from 'components/ui/CircularProgress';
import ImageLoader from 'components/ui/ImageLoader';
import Input from 'components/ui/Input';

import { useDispatch, useSelector } from 'react-redux';

import useFileHandler from 'hooks/useFileHandler';
import PropTypes from 'prop-types';
// import uuid from 'uuid';

const UserForm = ({ user, onSubmit, isLoading }) => {
    const defaultUser = {
        ...user
    };
    const [field, setField] = useState({
        fullname: { value: user ? defaultUser.fullname : '' },
        email: { value: user ? defaultUser.email : '' },
        mobile: { value: user ? defaultUser.mobile : '' },
        dateJoined: { value: user ? defaultUser.dateJoined : '' },
        address: { value: user ? defaultUser.address : '' },
        keywords: { value: user ? defaultUser.keywords : [''] },
        role: { value: user ? defaultUser.role : '' }
    });

    const dispatch = useDispatch();

    const onChangeRole = (e) => {
        switch (e.target.name) {
            case 'role': {
                onUserRoleInput(e.target.value)
            }
            default: { }
        }
    }

    const sanitizeNumber = (num) => {
        return Number(num.toString().replace(/^0*/, ''));
    };

    const onUserFullameInput = (value, error) => {
        setField({ ...field, fullname: { value, error } });
    };

    const onUserEmailInput = (value, error) => {
        setField({ ...field, email: { value, error } });
    };

    const onUserMobileInput = (value, error) => {
        setField({ ...field, mobile: { value, error } });
    };

    const onUserAddressInput = (value, error) => {
        setField({ ...field, address: { value, error } });
    };

    const onUserRoleInput = (value, error) => {
        setField({ ...field, role: { value, error } });
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        // eslint-disable-next-line no-extra-boolean-cast
        const noError = Object.keys(field).every(key => !!!field[key].error);

        if (field.fullname.value
            && field.email.value
            && field.mobile.value
            && noError
        ) {
            const newUser = {};

            Object.keys(field).forEach((i) => {
                newUser[i] = field[i].value;
            });

            onSubmit({
                ...newUser,
                dateUpdated: new Date().getTime()
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
                                field="fullname"
                                isRequired
                                label="* Nombre"
                                maxLength={60}
                                onInputChange={onUserFullameInput}
                                placeholder="Nombre"
                                readOnly={isLoading}
                                style={{ textTransform: 'capitalize' }}
                                type="text"
                                value={field.fullname.value}
                            />
                        </div>
						&nbsp;
						<div className="product-form-field">
                            <Input
                                field="email"
                                isRequired
                                label="* Email"
                                maxLength={60}
                                onInputChange={onUserEmailInput}
                                placeholder="nombre@dominio.com"
                                readOnly={isLoading}
                                type="text"
                                value={field.email.value}
                            />
                        </div>
                        <div className="product-form-field">
                            <select
                                name="role"
                                className="filters-category"
                                value={field.role.value}
                                onChange={onChangeRole}
                            >
                                <option value="USER">Usuario</option>
                                <option value="ADMIN">Administrador</option>
                            </select>
                        </div>
                    </div>
                    <div className="product-form-field">
                        <Input
                            field="mobile"
                            isRequired={false}
                            label="* Telefono"
                            onInputChange={onUserMobileInput}
                            placeholder="0123456789"
                            readOnly={isLoading}
                            type="text"
                            value={field.mobile.value.value}
                        />
                    </div>
                    <div className="product-form-field">
                        <Input
                            field="address"
                            isRequired={false}
                            label="* Dirección"
                            onInputChange={onUserAddressInput}
                            placeholder="Calle y Nro"
                            readOnly={isLoading}
                            type="text"
                            value={field.address.value}
                        />
                    </div>
                    <div className="d-flex">
                        <div className="product-form-field">
                            <Input
                                field="keywords"
                                isRequired
                                label="Palabras Claves"
                                maxLength={60}
                                placeholder="Palabras Claves"
                                readOnly={isLoading}
                                style={{ textTransform: 'capitalize' }}
                                type="text"
                                value={field.keywords.value}
                            />
                        </div>
						&nbsp;
						<div className="product-form-field">
                            <Input
                                field="dateJoined"
                                isRequired
                                label="* Fecha de Registro"
                                maxLength={60}
                                placeholder="DD/MM/AAAA"
                                readOnly={isLoading}
                                type="text"
                                value={field.dateJoined.value}
                            />
                        </div>
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
                            {isLoading ? 'Guardando Usuario' : 'Guardar Usuario'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

UserForm.propTypes = {
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

export default UserForm;
