import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

class MovieGridItem extends Component {

  static propType = {
    id: PropTypes.number,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    title: PropTypes.string,
    vote_average: PropTypes.number
  }

  async fetchMoviesBySearch(movieId) {
    const response = await axios.get(`/api/movie/${movieId}`);
    const movie = await response.data;
    this.setState({movie});
  }

  goToDetailPage = () => {
    const { id } = this.props.movie;
    this.props.goToMovieDetail(id);
  }

  render() {
    const {
      id,
      poster_path,
      release_date,
      title,
      vote_average
    } = this.props.movie;

    const backgroundImage = `https://image.tmdb.org/t/p/w780/${poster_path}`;

    return (
      <div className="video-grid-item" style={{backgroundImage: `url("${backgroundImage}")`}} onClick={this.goToDetailPage}>
        <div className="video-grid-item-overlay">
          <p>{title} ({moment(release_date).format('YYYY')})</p>
          <p>{vote_average} /10<i className="material-icons gi-star-icon">star</i></p>
        </div>
      </div>
    );
  }
};

export default MovieGridItem;