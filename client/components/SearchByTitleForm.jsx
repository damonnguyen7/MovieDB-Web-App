import React from 'react';
import PropTypes from 'prop-types';

const SearchByTitleForm = ({ handleSubmit, children }) => (
  <form className="search-movie-form" onSubmit={handleSubmit}>
    { children }
  </form>
);

SearchByTitleForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default SearchByTitleForm;