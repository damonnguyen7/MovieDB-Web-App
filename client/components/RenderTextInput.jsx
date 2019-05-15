import React from 'react';
import PropTypes from 'prop-types';

const RenderTextInput = ({className, name, placeholder, searchQuery, onChange, autoComplete}) => (
  <input 
    className={className}
    type="text" 
    name={name}
    placeholder={placeholder} 
    value={searchQuery}
    onChange={onChange}
    autoComplete={autoComplete}
  />
);

RenderTextInput.propType = {
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  autoComplete: PropTypes.string.isRequired,
};

export default RenderTextInput;