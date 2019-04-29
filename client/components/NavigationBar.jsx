import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchByTitleForm from './SearchByTitleForm';
import HomeButton from './HomeButton';
import LoadingBar from './LoadingBar';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.updateUrl = this.updateUrl.bind(this);
    this.goHome = this.goHome.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  updateUrl(endpoint) {
    if (endpoint.length > 0) {
      this.props.history.push(`/movies/search/?search=${endpoint}&page=1`); 
    } else {
      this.props.history.push(`/`); 
    }
  }

  goHome() {
    this.props.history.push(`/`);
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    const isLoading = this.props.displaySpinner;

    return (
      <nav id="nav-bar">
        <div id="nav-bar-component-1">
          <HomeButton 
            currentPath={this.props.location.pathname} 
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
    displaySpinner
  };
};

export default connect(mapStateToProps, {})(NavigationBar);