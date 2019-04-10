import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from '@emotion/core';
import BarLoader from 'react-spinners/BarLoader';

import SearchByTitleForm from './SearchByTitleForm';

const override = css`
    display: block;
    margin: 0 auto;
    --box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
`;

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
    const loading = this.props.displaySpinner;

    return (
      <nav id="nav-bar">
        <div id="nav-bar-component-1">
          <div className="md-back-btn-icon-container">
            { this.props.location.pathname.slice(0,7) === '/movie/' ? <i className="material-icons md-back-btn-icon" onClick={this.goBack}>keyboard_backspace</i> : null }
            { this.props.location.pathname === '/' || this.props.location.pathname.slice(0, 7) === '/movies' ? <i className="material-icons md-home-btn-icon" onClick={this.goHome}>home</i> : null }
          </div>
          <SearchByTitleForm updateUrl={this.updateUrl} />
        </div>
        <BarLoader
          css={override}
          width={'100%'}
          color={'#95afc0'}
          loading={loading}
        />
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