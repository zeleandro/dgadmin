import React, { useState, PropTypes } from 'react';

const CheckBoxField = React.forwardRef(({
    className,
    type,
    field,
    label,
    showError,
    showLabel,
    isRequired,
    onInputChange,
    validate,
    ...rest
}, ref) => {
    state = {
        isChecked: false,
    }

    const toggleCheckboxChange = () => {
        const { handleCheckboxChange, label } = this.props;

        this.setState(({ isChecked }) => (
            {
                isChecked: !isChecked,
            }
        ));

        handleCheckboxChange(label);
    }


    const { label } = this.props;
    const { isChecked } = this.state;

    return (
        <div className="checkbox">
            <label>
                <input
                    type="checkbox"
                    value={label}
                    checked={isChecked}
                    onChange={this.toggleCheckboxChange}
                />

                {label}
            </label>
        </div>
    );
});

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    handleCheckboxChange: PropTypes.func.isRequired,
};

export default CheckBoxField;