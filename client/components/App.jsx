import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";

import MovieGrid from './MovieGrid';
import MovieDetail from './MovieDetail';
import NavigationBar from './NavigationBar';

function App() {
  return (
    <div>
      <Router>
        <Route path={["/", "/movies/search", "/movie/:movieId", "/movies/popular/:pageNumber"]} exact component={NavigationBar} />
        <Route path={["/", "/movies/search", "/movies/popular/:pageNumber"]} exact component={MovieGrid} />
        <Route path="/movie/:movieId" exact component={MovieDetail} />
      </Router>
    </div>
  );
};

export default App;