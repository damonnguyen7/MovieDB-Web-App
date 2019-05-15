import React from 'react';
import PropTypes from 'prop-types';

import SearchByTitleFormContainer from './SearchByTitleFormContainer';
import HomeButton from './HomeButton';

const NavigationBar = ({location, goHome, goBack, history}) => (
  <div id="nav-bar-component-1">
    <HomeButton 
      currentPath={location.pathname} 
      goHome={goHome} 
      goBack={goBack}
    />
    <SearchByTitleFormContainer history={history}  />
  </div>
);

NavigationBar.propTypes = {
  location: PropTypes.object.isRequired,
  goHome: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default NavigationBar;