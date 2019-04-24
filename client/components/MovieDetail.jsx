import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import TrailerPlayer from './TrailerPlayer';
import { toggleSpinner } from '../actions/index';

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieDetail: {}
    };
    this.renderGenres = this.renderGenres.bind(this);
    this.renderMovieDuration = this.renderMovieDuration.bind(this);
  }

  componentDidMount() {
    const { pathname, isExact, params } = this.props.match;
    if (isExact) {
      this.fetchMovieDetail(params.movieId);
    }
  }

  async fetchMovieDetail(movieId) {
    this.props.toggleSpinner();
    const response = await axios.get(`/api/movie/${movieId}`);
    const movieDetail = await response.data;
    this.setState({movieDetail}, () => this.props.toggleSpinner());
  }

  renderGenres() {
    const { genres } = this.state.movieDetail;
    return genres.map((genre) => {
      return <li key={genre.id}>{genre.name}</li>
    });
  }

  renderMovieDuration(minutes) {
    let h = Math.floor(minutes / 60);
    let m = minutes % 60;
    if (m === 0) {
      return `${h}h`
    } else {
      return `${h}h${m}min`;
    }
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    const {
      adult,
      backdrop_path,
      belongs_to_collection,
      budget,
      genres,
      homepage,
      id,
      imdb_id,
      original_language,
      original_title,
      overview,
      popularity,
      poster_path,
      production_companies,
      production_countries,
      release_date,
      revenue,
      runtime,
      spoken_languages,
      status,
      tagline,
      title,
      video,
      vote_average,
      vote_count,
      results
    } = this.state.movieDetail;
    let isLoading = this.props.isLoading;
    let hasGenres = genres && genres.length > 0;

    return (
      <div id="movie-detail-page">
        
          {
            isLoading ? null :
            <div className="movie-detail-container">

              <img className="movie-detail-img" src={`https://image.tmdb.org/t/p/w780/${poster_path}`} />

              <div className="md-description-container">
                <div className="md-title-rating-container">
                  <p className="md-title">{ title }</p>
                  <div className="md-rating-container">
                    <p className="md-rating">{ vote_average } /10 <i className="material-icons">star</i></p>
                    <p className="vote-count">({ vote_count })</p>
                  </div>
                </div>
                <div className="meta-container">
                <p className="run-time">{ this.renderMovieDuration(runtime) } -</p>
                {
                  hasGenres ? <ol className="genre-list">{this.renderGenres()}</ol> : null
                }
                <p>- {moment(release_date).format("MMM D, YYYY")}</p>
                </div>
                <p>{tagline}</p>
                <p className="md-overview">{overview}</p>
                <TrailerPlayer trailers={results} />
              </div>

            </div>
          }
        
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const { displaySpinner } = state.appReducer;
  return {
    isLoading: displaySpinner
  };
};

export default connect(mapStateToProps, {
  toggleSpinner
})(MovieDetail);