import 'babel-polyfill';
import React from 'react';
import PropTypes from 'prop-types';

const MovieGrid = ({ children }) => (
  <div className="video-grid-container">
    { children }
  </div>
);

MovieGrid.propTypes = {
  children: PropTypes.node
}

export default MovieGrid;