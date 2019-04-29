import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { toggleSpinner } from '../actions/index';

class SearchByTitleForm extends Component {

  state = {
    searchQuery: ''
  }

  static propTypes = {
    updateUrl: PropTypes.func.isRequired
  }

  handleChange = (e) => {
    this.setState({
      searchQuery: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let searchQuery = this.state.searchQuery;
    this.props.updateUrl(searchQuery);
  }

  clearInputField = () => {
    this.setState({searchQuery: ''});
  }

  render() {
    let searchQuery = this.state.searchQuery;
    let hasSearchQuery = searchQuery.length > 0;

    return (
      <form className="search-movie-form" onSubmit={this.handleSubmit}>
        <div className="m-i-search-container">
          <i className="material-icons m-i-search">search</i>
        </div>
        <input 
          className="search-movie-input" 
          type="text" 
          name="search-movie" 
          placeholder="Search movie title" 
          value={this.state.searchQuery}
          onChange={this.handleChange}
          autoComplete="off"
        />
        <div className="m-i-clear-container">
          <i onClick={this.clearInputField} className={hasSearchQuery ? "material-icons m-i-clear" : "hide-element"}>clear</i>
        </div>
      </form>
    );
  }
};

export default connect(() => {
  return {};
}, {
  toggleSpinner
})(SearchByTitleForm);