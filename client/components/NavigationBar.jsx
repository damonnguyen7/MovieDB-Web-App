import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SearchByTitleForm from './SearchByTitleForm';
import HomeButton from './HomeButton';
import LoadingBar from './LoadingBar';

class NavigationBar extends Component {

  static = {
    isLoading: PropTypes.bool.isRequired
  };

  updateUrl = (endpoint) => {
    if (endpoint.length > 0) {
      this.props.history.push(`/movies/search/?search=${endpoint}&page=1`); 
    } else {
      this.props.history.push(`/`); 
    }
  }

  goHome = () => {
    this.props.history.push(`/`);
  }

  goBack = () => {
    this.props.history.goBack();
  }

  render() {
    const { isLoading, location } = this.props;

    return (
      <nav id="nav-bar">
        <div id="nav-bar-component-1">
          <HomeButton 
            currentPath={location.pathname} 
            goHome={this.goHome} 
            goBack={this.goBack} 
          />
          <SearchByTitleForm updateUrl={this.updateUrl} />
        </div>
        <LoadingBar isLoading={isLoading} />
      </nav>
    );
  }
};

const mapStateToProps = (state) => {
  const { displaySpinner } = state.appReducer;
  return {
    isLoading: displaySpinner
  };
};

export default connect(mapStateToProps, {})(NavigationBar);