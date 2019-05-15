import React from 'react';
import PropTypes from 'prop-types';

const ClearIcon = ({ hasSearchQuery, clearInputField }) => (
  <div className="m-i-clear-container">
    <i onClick={clearInputField} className={hasSearchQuery ? "material-icons m-i-clear" : "hide-element"}>clear</i>
  </div>
);

ClearIcon.propTypes = {
  hasSearchQuery: PropTypes.bool.isRequired,
  clearInputField: PropTypes.func.isRequired
};

export default ClearIcon;