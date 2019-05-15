import 'babel-polyfill';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import MovieGrid from './MovieGrid';
import MovieGridItem from './MovieGridItem';
import Pagination from './Pagination'
import { toggleSpinner } from '../actions/index';

class MovieGridContainer extends Component {
  state = {
    movies: [],
    currentPage: undefined,
    totalPages: undefined
  }

  componentDidMount(){
    const { pathname, search } = this.props.location;
    if (pathname === '/') {
      this.fetchPopularMovies(1);
    } else if (pathname.slice(0, 16) === '/movies/popular/') {
      let pageNumber = pathname.replace(/\D/g, '');
      this.fetchPopularMovies(pageNumber);
    } else if (pathname === '/movies/search/') {
      this.fetchMovies(decodeURI(search));
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { pathname, search } = this.props.location;
    if (pathname !== prevProps.location.pathname || prevProps.location.search !== search) {
      if (pathname === '/') {
        this.fetchPopularMovies(1);
      } else if (pathname.slice(0, 16) === '/movies/popular/') {
        let pageNumber = pathname.replace(/\D/g, '');
        this.fetchPopularMovies(pageNumber);
      } else if (pathname === '/movies/search/') {
        this.fetchMovies(decodeURI(search));
      }
    }
  }

  handlePageChange = (data) => {
    const selectedPage = data.selected + 1;
    const { pathname, search } = this.props.location;
    if (pathname === '/' || pathname.slice(0, 16) === '/movies/popular/') {
      this.props.history.push(`/movies/popular/${selectedPage}`);
    } else if (pathname === '/movies/search/') {
      const queries = search.slice(0, search.length - 1) + selectedPage;
      this.props.history.push(`/movies/search/${queries}`);
    }
  }

  fetchPopularMovies(pageNumber) {
    this.props.toggleSpinner();
    axios.get(`/api/movies/popular/${pageNumber}`)
      .then((response) => {
        const movies = response.data.results;
        const currentPage = response.data.page;
        const totalPages = response.data.total_pages;
        this.setState({
          movies,
          currentPage,
          totalPages
        }, () => this.props.toggleSpinner());
      })
      .catch((error) => {
        throw error;
        this.props.toggleSpinner();
      })
  }

  fetchMovies(searchQuery) {
    const queries = searchQuery.slice(1).split('&').reduce((queries, query) => {
      let parsedQuery = query.split('=');
      let key = parsedQuery[0];
      let value = parsedQuery[1];
      queries[key] = value;
      return queries;
    }, {});
    this.props.toggleSpinner()
    axios.get(`/api/movies/search/`, {
      params: {
        ...queries
      }
    })
    .then((response) => {
      const movies = response.data.results;
      const currentPage = response.data.page;
      const totalPages = response.data.total_pages;
      this.setState({
        movies,
        currentPage,
        totalPages
      }, () => this.props.toggleSpinner());
    })
    .catch((error) => {
      throw error;
      this.props.toggleSpinner();
    });
  }

  goToMovieDetail = (movieId) => {
    this.props.history.push(`/movie/${movieId}`); 
  }

  renderMovieGridItems = (movies) => {
    return movies.map((movie) => <MovieGridItem movie={movie} key={movie.id} goToMovieDetail={this.goToMovieDetail} /> );
  }

  render() {
    const { movies, currentPage, totalPages } = this.state;

    return (
      <div id="video-grid">
        <MovieGrid>
          { this.renderMovieGridItems(movies) }
        </MovieGrid>
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          handlePageChange={this.handlePageChange} 
        />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {
  toggleSpinner
})(MovieGridContainer);