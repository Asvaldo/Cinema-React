// src/components/common/Select.jsx
import React from 'react';

const Select = ({ id, label, value, onChange, options = [], required = false, defaultOptionText = "Selecione", className = '' }) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <select
        id={id}
        className={`form-select ${className}`}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">{defaultOptionText}</option>
        {options.map(option => (
          <option key={option.value || option} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
