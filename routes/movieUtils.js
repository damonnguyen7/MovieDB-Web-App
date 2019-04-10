const axios = require('axios');
require('dotenv').config();
const TMDB_KEY = process.env.TMDb_API;

function encodeURI(cb) {
  return function(uri, ...args) {
    uri = encodeURIComponent(uri);
    return cb.apply(this, [uri, ...args]);
  };
}

function getPopularMovies(page) {
  return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`);
};

function searchMovieByTitle(searchQuery, page) {
  return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&query=${searchQuery}&page=${page}`);
};

function getMovieDescriptionById(movieId) {
  return axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_KEY}`);
};

function getMovieImagesById(movieId) {
  return axios.get(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${TMDB_KEY}&language=en-US`);
};

function getMovieVideosById(movieId) {
  return axios.get(`http://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_KEY}`);
};

module.exports = {
  getPopularMovies: encodeURI(getPopularMovies),
  searchMovieByTitle: encodeURI(searchMovieByTitle),
  getMovieDescriptionById: encodeURI(getMovieDescriptionById),
  getMovieImagesById: encodeURI(getMovieImagesById),
  getMovieVideosById: encodeURI(getMovieVideosById)
};