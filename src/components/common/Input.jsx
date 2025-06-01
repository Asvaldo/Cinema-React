// src/components/common/Input.jsx
import React from 'react';

const Input = ({ id, label, type = 'text', value, onChange, required = false, placeholder = '', className = '', ...props }) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <input
        type={type}
        id={id}
        className={`form-control ${className}`}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default Input;
