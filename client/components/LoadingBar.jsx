import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import BarLoader from 'react-spinners/BarLoader';

const override = css`
  display: block;
  margin: 0 auto;
  --box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
`;

const LoadingBar = ({ loadingBarWidth, loadingBarColor, isLoading }) => (
  <BarLoader
    css={override}
    width={loadingBarWidth}
    color={loadingBarColor}
    loading={isLoading}
  />
);

LoadingBar.propTypes = {
  loadingBarWidth: PropTypes.number.isRequired,
  loadingBarColor: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default LoadingBar;