// src/components/common/Botao.jsx
import React from 'react';

const Botao = ({ type = 'button', onClick, children, variant = 'primary', className = '', iconClass = '' }) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
    >
      {iconClass && <i className={`${iconClass} me-2`}></i>}
      {children}
    </button>
  );
};

export default Botao;
