import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const MovieGridItem = ({ movie, goToMovieDetail }) => {
  const { id, poster_path, release_date, title, vote_average } = movie;
  const backgroundImage = `https://image.tmdb.org/t/p/w780/${poster_path}`;

  return (
    <div 
      className="video-grid-item" 
      style={{backgroundImage: `url("${backgroundImage}")`}} 
      onClick={() => goToMovieDetail(id)}
    >
      <div className="video-grid-item-overlay">
        <p>{title} ({moment(release_date).format('YYYY')})</p>
        <p>{vote_average} /10<i className="material-icons gi-star-icon">star</i></p>
      </div>
    </div>
  );
}

MovieGridItem.propTypes = {
  movie: PropTypes.object.isRequired,
  goToMovieDetail: PropTypes.func.isRequired
};

export default MovieGridItem;