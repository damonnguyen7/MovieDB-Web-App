const express = require('express');
const router = express.Router();
const waterfall = require('async-waterfall');
const movieUtils = require('./movieUtils');
const redisClient = require('./redis-client');

const expirationTime = 3600; //1 hour

router.get('/movies/popular/:pageNumber', (req, res) => {
  const pageNumber = req.params.pageNumber;
  const redisKey = `/api/movies/popular/${pageNumber}`; 
  redisClient.get(redisKey, (error, results) => {
    if (error) res.json(error);
    if (results) {
      res.json(JSON.parse(results));
    } else {
      movieUtils.getPopularMovies(pageNumber)
        .then((response) => {
          let moviesData = response.data;
          redisClient.setex(redisKey, expirationTime, JSON.stringify({...moviesData, }));
          res.json(moviesData);
        })
        .catch((error) => res.json(error));
    }
  });
});

router.get('/movies/search/', (req, res) => {
  const { search, page } =  req.query;
  const redisKey = `/movies/search/?search=${search}&page=${page}`;
  redisClient.get(redisKey, (error, results) => {
    if (error) res.json(error);
    if (results) {
      res.json(JSON.parse(results));
    } else {
      movieUtils.searchMovieByTitle(search, page)
        .then((response) => {
          let moviesData = response.data;
          redisClient.setex(redisKey, expirationTime, JSON.stringify({...moviesData}))
          res.json(moviesData);
        })
        .catch((error) => res.json(error));
    }
  });
});

router.get('/movie/:movieId', (req, res) => {
  let movieId = req.params.movieId;
  const redisKey = `/movie/${movieId}`;
  redisClient.get(redisKey, (error, results) => {
    if (error) res.json(error);
    if (results) {
      res.json(JSON.parse(results));
    } else {
      waterfall([
        (callback) => {
          movieUtils.getMovieDescriptionById(movieId)
            .then((response) => {
              let movieDetail = response.data;
              callback(null, movieDetail)
            })
            .catch((error) => callback(error));
        },
        (movieDetails, callback) => {
          movieUtils.getMovieVideosById(movieId)
            .then((response) => {
              let movieVideos = response.data;
              let movieData = Object.assign(movieDetails, movieVideos);
              callback(null, movieData);
            })
            .catch((error) => callback(error));
        }
      ], (error, results) => {
        if (error) throw error;
        redisClient.setex(redisKey, expirationTime, JSON.stringify({...results}));
        res.json(results);
      });
    }
  });
});

module.exports = router;
