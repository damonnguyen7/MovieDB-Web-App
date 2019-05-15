import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SearchByTitleForm from './SearchByTitleForm';
import RenderTextInput from './RenderTextInput';
import SearchIcon from './SearchIcon';
import ClearIcon from './ClearIcon';
import { toggleSpinner } from '../actions/index';

class SearchByTitleFormContainer extends Component {

  state = {
    searchQuery: ''
  }

  static propTypes = {
    history: PropTypes.object.isRequired
  }

  onChange = (e) => {
    this.setState({
      searchQuery: e.target.value
    });
  }

  searchMovies = (endpoint) => {
    if (endpoint.length > 0) {
      this.props.history.push(`/movies/search/?search=${endpoint}&page=1`); 
    } else {
      this.props.history.push(`/`); 
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let searchQuery = this.state.searchQuery;
    this.searchMovies(searchQuery);
  }

  clearInputField = () => {
    this.setState({searchQuery: ''});
  }

  render() {
    let searchQuery = this.state.searchQuery;
    let hasSearchQuery = searchQuery.length > 0;

    return (
      <SearchByTitleForm handleSubmit={this.handleSubmit}>
        <SearchIcon />
        <RenderTextInput 
          className="search-movie-input" 
          name="search-movie"
          placeholder="Search movie title" 
          searchQuery={this.state.searchQuery}
          onChange={this.onChange}
          autoComplete="off"
        />  
        <ClearIcon 
          hasSearchQuery={hasSearchQuery} 
          clearInputField={this.clearInputField} 
        />
      </SearchByTitleForm>
    );
  }
};

export default connect(() => {
  return {};
}, {
  toggleSpinner
})(SearchByTitleFormContainer);