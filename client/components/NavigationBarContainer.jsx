import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavigationBar from './NavigationBar';
import LoadingBar from './LoadingBar';

class NavigationBarContainer extends Component {

  state = {
    loadingBarWidth: window.innerWidth,
    loadingBarColor: '#95afc0',
  }
  
  static propTypes = {
    isLoading: PropTypes.bool.isRequired
  };

  goHome = () => {
    this.props.history.push(`/`);
  }

  goBack = () => {
    this.props.history.goBack();
  }

  render() {
    const { isLoading, location, history } = this.props;
    const { loadingBarWidth, loadingBarColor } = this.state;

    return (
      <nav id="nav-bar">
        <NavigationBar 
          location={location}
          goHome={this.goHome}
          goBack={this.goBack}
          updateUrl={this.updateUrl}
          history={history}
        />
        <LoadingBar
          loadingBarWidth={loadingBarWidth}
          loadingBarColor={loadingBarColor}
          isLoading={isLoading}
        />
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

export default connect(mapStateToProps, {})(NavigationBarContainer);