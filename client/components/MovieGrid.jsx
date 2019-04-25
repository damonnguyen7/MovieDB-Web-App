import 'babel-polyfill';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import MovieGridItem from './MovieGridItem';
import Pagination from './Pagination'
import { toggleSpinner } from '../actions/index';


class MovieGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      currentPage: undefined,
      totalPages: undefined
    };
    this.renderMovieGridItems = this.renderMovieGridItems.bind(this);
    this.goToMovieDetail = this.goToMovieDetail.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
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

  handlePageChange(data) {
    const selectedPage = data.selected + 1;
    const { pathname, search } = this.props.location;
    if (pathname === '/' || pathname.slice(0, 16) === '/movies/popular/') {
      this.props.history.push(`/movies/popular/${selectedPage}`);
    } else if (pathname === '/movies/search/') {
      const queries = search.slice(0, search.length - 1) + selectedPage;
      this.props.history.push(`/movies/search/${queries}`);
    }
  }

  async fetchPopularMovies(pageNumber) {
    this.props.toggleSpinner();
    try {
      const response = await axios.get(`/api/movies/popular/${pageNumber}`);
      const movies = response.data.results;
      const currentPage = response.data.page;
      const totalPages = response.data.total_pages;
      this.setState({
        movies,
        currentPage,
        totalPages,
        currentPage
      }, () => {
        this.props.toggleSpinner();
      });
    } catch (error) {
      this.props.toggleSpinner();
    }
  }

  async fetchMovies(searchQuery) {
    this.props.toggleSpinner();
    try {
      const queries = searchQuery.slice(1).split('&').reduce((queries, query) => {
        let parsedQuery = query.split('=');
        let key = parsedQuery[0];
        let value = parsedQuery[1];
        queries[key] = value;
        return queries;
      }, {});
      const response = await axios.get(`/api/movies/search/`, {
        params: {
          ...queries
        }
      });
      const movies = response.data.results;
      const currentPage = response.data.page;
      const totalPages = response.data.total_pages;
      this.setState({
        movies,
        currentPage,
        totalPages
      }, () => {
        this.props.toggleSpinner();
      });
    } catch (error) {
      this.props.toggleSpinner();
    }
  }

  goToMovieDetail(movieId) {
    this.props.history.push(`/movie/${movieId}`); 
  }

  renderMovieGridItems(movies) {
    return movies.map((movie) => {
      let id = movie.id;
      return (
        <MovieGridItem movie={movie} key={id} goToMovieDetail={this.goToMovieDetail} />
      );
    });
  }

  render() {
    let movies = this.state.movies;
    let hasMovies = movies.length > 0;

    return (
      <div id="video-grid">
        <div className="video-grid-container">{ hasMovies ? this.renderMovieGridItems(movies) : null }</div>
        {
          !hasMovies ? null :
          <Pagination 
            currentPage={this.state.currentPage} 
            totalPages={this.state.totalPages} 
            handlePageChange={this.handlePageChange} 
          />
        }
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {
  toggleSpinner
})(MovieGrid);