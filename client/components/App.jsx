import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";

import MovieGridContainer from './MovieGridContainer';
import MovieDetail from './MovieDetail';
import NavigationBarContainer from './NavigationBarContainer';

function App() {
  return (
    <Fragment>
      <Router>
        <Route path={["/", "/movies/search", "/movie/:movieId", "/movies/popular/:pageNumber"]} exact component={NavigationBarContainer} />
        <Route path={["/", "/movies/search", "/movies/popular/:pageNumber"]} exact component={MovieGridContainer} />
        <Route path="/movie/:movieId" exact component={MovieDetail} />
      </Router>
    </Fragment>
  );
};

export default App;