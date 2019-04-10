import React, { Component } from 'react';
import { createStore, compose } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { BrowserRouter as Router, Route } from "react-router-dom";

import MovieGrid from './MovieGrid';
import MovieDetail from './MovieDetail';
import NavigationBar from './NavigationBar';
import { toggleSpinner } from '../actions/index';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let movies = this.props.movies;
    return (
      <div>
        <Router>
          <Route path={["/", "/movies/search", "/movie/:movieId", "/movies/popular/:pageNumber"]} exact component={NavigationBar} />
          <Route path={["/", "/movies/search", "/movies/popular/:pageNumber"]} exact component={MovieGrid} />
          <Route path="/movie/:movieId" exact component={MovieDetail} />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {
  toggleSpinner
})(App);