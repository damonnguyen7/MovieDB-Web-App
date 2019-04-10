import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class MovieGridItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
    this.goToDetailPage = this.goToDetailPage.bind(this);
  }

  async fetchMoviesBySearch(movieId) {
    const response = await axios.get(`/api/movie/${movieId}`);
    const movie = await response.data;
    this.setState({movie});
  }

  goToDetailPage() {
    const { id } = this.props.movie;
    this.props.goToMovieDetail(id);
  }

  render() {
    const {
      adult,
      backdrop_path,
      genre_ids,
      id,
      original_language,
      original_title,
      overview,
      popularity,
      poster_path,
      release_date,
      title,
      video,
      vote_average,
      vote_count
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

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(MovieGridItem);